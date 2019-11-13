import { Context, Next } from 'koa'
import chalk from 'chalk'
import { Util } from '../util/Util'

export async function log (ctx: Context, next: Next) {
  try {
    await next()
    const userAgent = ctx.request.get('User-Agent')
    const rSize = ctx.response.length || 0
    const status = ctx.response.status
    const logger = status < 400 ? chalk.green : chalk.red
    function base (level: string, message?: string): void {
      console.log(`[${logger(level)}][${Util.formatDate(new Date(), 'yyyy-MM-dd hh:mm:ss')}] "HTTP/1.1" "${ctx.method}" "${ctx.url}" "${userAgent}" ${logger(status)} ${rSize} ${(message || '') && logger(message)}`)
    }
    status < 400 ? base('INFO') : base('ERROR', ctx.response.body || ctx.response.message)
  } catch (err) {
    console.log(err)
  }
}