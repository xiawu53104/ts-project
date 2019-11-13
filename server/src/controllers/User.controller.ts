import crypto from 'crypto'
import { Context } from 'koa'
import { UserService } from '../services'
import { User } from '../models'
import { controller, http, auth } from '../decorator'

@controller('user')
export class UserController {
  private userSerive: UserService = new UserService()

  @http('/register', 'post')
  public saveOne (ctx: Context) {
    try {
      const payload = ctx.request.body
      const user: User = new User()
      user.name = payload.username
      let md5 = crypto.createHash('md5')
      user.password = md5.update(payload.password).digest('base64')
      user.token = ''
      this.userSerive.saveUser(user)
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
  public login (ctx: Context) {
    
  }
}
