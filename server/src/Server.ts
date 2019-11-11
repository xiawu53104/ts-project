import Koa from 'koa'
import koaJwt from 'koa-jwt'
import KoaRouter from 'koa-router'
import * as ROUTERS from './routes'
import { config } from '../config'

export class Server {
  private readonly app: Koa;

  constructor () {
    this.app = new Koa()
    this.init()
  }

  private init (): void {
    // const router: KoaRouter = new KoaRouter()
    // router.get('/', async (ctx) => {
    //   ctx.body = 'hello koa'
    // })
    // this.app.use(router.routes())

    // let unlessPath: RegExp[]
    // for (let key in ROUTERS) {
    //   const r = new ROUTERS[key]()
    //   if (!r.authorized) {
    //     const reg = new RegExp('^' + r.prefix)
    //     unlessPath.push(reg)
    //   }
    //   this.app.use(r.router.routes())
    // }
    let r = new ROUTERS.JWTRoute()
    this.app.use(r.router.routes())
    this.app.use((ctx, next) => {
      return next().catch((err) => {
        if (401 == err.status) {
          ctx.status = 401
          ctx.body = 'Protected resource, use Authorization header to get access\n'
        } else {
          throw err
        }
      })
    })
    this.app.use(koaJwt({ secret: config.SECRET }).unless({
      path: [
        /^\/jwt/
      ]
    }))
  }

  public start (): void {
    this.app.listen(8089, () => {
      console.log(`server is running on http://localhost:8089`)
    })
  }
}