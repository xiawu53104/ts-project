import { Context } from 'koa'
import { JWTService } from '../services'
import { controller, http, auth } from '../decorator'

@controller()
export class JWTController {
  private jwtService: JWTService = new JWTService()

  @auth()
  @http('/jwt/refresh', 'post')
  public async test (ctx: Context) {
    const oldToken: string = ctx.header.authorization
    ctx.body = 'refresh'
  }
}
