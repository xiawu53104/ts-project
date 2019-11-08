import Koa from 'koa'
import KoaRouter from 'koa-router'

export class Server {
  private readonly app: Koa;

  constructor () {
    this.app = new Koa()
    this.init()
  }

  private init (): void {
    const router: KoaRouter = new KoaRouter()
    router.get('/', async (ctx) => {
      ctx.body = 'hello koa'
    })
    this.app.use(router.routes())
  }

  public start (): void {
    this.app.listen(8089, () => {
      console.log(`server is running on http://localhost:8089`)
    })
  }
}