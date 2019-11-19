import crypto from 'crypto'
import { Context } from 'koa'
import { UserService, JWTService } from '../services'
import { User } from '../models'
import { controller, http, auth } from '../decorator'

@controller('user')
export class UserController {
  private userSerive: UserService = new UserService()
  private jwtService: JWTService = new JWTService()

  @http('/register', 'post')
  public saveOne (ctx: Context): void {
    try {
      const payload: { username: string, password: string } = ctx.request.body
      const user: User = new User()
      user.name = payload.username
      let md5: crypto.Hash = crypto.createHash('md5')
      user.password = md5.update(payload.password).digest('base64')
      user.token = ''
      this.userSerive.createUser(user)
      ctx.body = {
        message: 'ok',
        user
      }
    } catch (err) {
      ctx.body = err
      ctx.status = 500
    }
  }

  @http('/login', 'post')
  public async login (ctx: Context) {
    const payload: { username: string, password: string } = ctx.request.body
    let md5: crypto.Hash = crypto.createHash('md5')
    const data = {
      name: payload.username,
      password: md5.update(payload.password).digest('base64')
    }
    try {
      let user: User = await this.userSerive.findOne(data)
      if (user) {
        let token: string = this.jwtService.signToken(
          {
            name: user.name,
            id: user.id
          },
          { expiresIn: 60 }
        )
        this.userSerive.udateUserToken(token, user)
        ctx.body = {
          result: true,
          data: token
        }
      } else {
        ctx.body = {
          result: false,
          message: '用户名或密码错误'
        }
      }
    } catch (err) {
      console.log(err)
      ctx.body = 'Not Found'
      ctx.status = 404
    }
  }
}
