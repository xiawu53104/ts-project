import { Context } from 'koa'
import { JWTService } from '../services'
import { controller, http, auth } from '../decorator'

@controller()
export class JWTController {
  private jwtService: JWTService = new JWTService()

  @http('/jwt', 'get')
  public async getToken (ctx: Context) {
    const payload: { name: string, role: string} = ctx.request.query
    const token = await this.jwtService.signToken(payload)
    ctx.body = { token }
  }

  @auth()
  @http('/test', 'get')
  public async test (ctx: Context) {
    ctx.body = 'hello'
  }
}
