import { Context, Response } from 'koa'
import { Controller } from './controller'
import { JWTService } from '../services'

export class JWTController extends Controller {
  private jwtService: JWTService;

  constructor (ctx: Context) {
    super(ctx)
    this.jwtService = new JWTService()
  }

  public async getToken () {
    console.log(this.ctx.request.query)
    const payload = this.ctx.request.query
    const token = await this.jwtService.signToken(payload)
    this.ctx.response.body = token
  }
}
