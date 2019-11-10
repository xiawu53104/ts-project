import { Context } from 'koa'

export abstract class Controller {
  constructor (public ctx: Context) {
    
  }
}

