import { Router, Base } from './Route'
import { JWTController } from '../controllers'

export class JWTRoute extends Router implements Base {
  prefix: string;
  authorized: boolean;
  constructor () {
    super(JWTController)
    this.prefix = '/jwt'
    this.authorized = false
    this.router
        .get(this.prefix + '/', this.handler(JWTController.prototype.getToken))
  }
}