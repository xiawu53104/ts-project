import { Context, Next } from 'koa'
import jwt from 'jsonwebtoken'
import { config } from '../../config'

interface Payload {
  name:string;
  id: number
}

export async function verify (ctx: Context, next: Next) {
  const token: string = ctx.header.authorization
  if (token) {
    try {
      let paylaod: Payload = await jwt.verify(token, config.SECRET) as Payload
      ctx.state.user = {
        name: paylaod.name,
        id: paylaod.id
      }
      next()
    } catch (err) {
      ctx.status = 401
      ctx.body = 'token verify fail'
    }
  } else {
    ctx.status = 401
    ctx.body = 'miss token'
  }
}