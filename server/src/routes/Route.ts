import KoaRouter from 'koa-router'
import { Context } from 'koa'

export abstract class Router {
  public router: KoaRouter
  private controller: any

  constructor (controller: any) {
    this.controller = controller
    this.router = new KoaRouter()
  }

  protected handler (action: () => void): any {
    return (ctx: Context) => action.call(new this.controller(ctx))
  }
}

export interface Base {
  prefix: string;
  authorized: boolean;
}
