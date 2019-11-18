import { Context, Next } from 'koa'
import jwt from 'jsonwebtoken'
import { config } from '../../config'

interface Payload {
  name:string;
  id: number
}

export async function verify (ctx: Context, next: Next) {
  try {
    const token: string = ctx.header.authorization
    let paylaod: Payload = await jwt.verify(token, config.SECRET) as Payload
    ctx.state.user = {
      name: paylaod.name,
      id: paylaod.id
    }
    next()
  } catch (err) {
    if (err.name === 'TokenExpiredError') {
      // token 过期则在响应头设置 authorization 返给前端新的 token 
      const newToken: string = jwt.sign(ctx.state.user, config.SECRET, { expiresIn: '1h' })
      ctx.res.setHeader('authorization', newToken)
      ctx.body = 'token expired'
      ctx.status = 200
    }
    ctx.status = 401
    ctx.body = err
  }
}