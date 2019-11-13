import fs from 'fs'
import path from 'path'
import Koa from 'koa'
import KoaRouter from 'koa-router'
import json from 'koa-json'
import bodyparser from 'koa-bodyparser'
import { METHOD } from './decorator/http'
import { verify, log } from './middlewares'

export class Server {
  private readonly app: Koa;
  private router: KoaRouter;

  constructor () {
    this.app = new Koa()
    this.router = new KoaRouter()
    this.buildRouter()
    this.init()
  }

  private buildRouter () {
    const dir: string = './controllers'
    const files: string[] = fs.readdirSync(path.resolve(__dirname, dir))
    for (let fileName of files) {
      if (fileName.endsWith('\.ts')) {
        const expt = require(dir + '/' + fileName)
        const key = Object.keys(expt)[0]
        const Controller = expt[key]
        for (let item of Controller._routes) {
          let path: string = Controller._prefix + item.path
          const middlewares: Array<any> = [item.handler.bind(new Controller())]
          if (Controller._auth && Controller._auth.includes(item.fnName)) {
            middlewares.unshift(verify)
          }
          this.router[item.method.toLowerCase() as METHOD](path, ...middlewares)
        }
      }
    }
  }

  private async init () {
    this.app.use(json())
    this.app.use(bodyparser())
    this.app.use(log)
    this.app.use(this.router.routes())
  }

  public start (): void {
    this.app.listen(8089, () => {
      console.log(`server is running on http://localhost:8089`)
    })
  }
}