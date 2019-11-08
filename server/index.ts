import cluster from 'cluster'
import os from 'os'
import { Server } from './src/server'
import { Util } from './src/util/util'

if (cluster.isMaster) {
  console.log(`主进程 ${process.pid} 正在运行`)

  const numCpus: number = os.cpus().length
  for (let i = 0; i < numCpus; i++) {
    cluster.fork()
    if (!Util.isProduction()) break
  }

  cluster.on('exit', (worker, code, signal) => {
    console.log(`工作进程 ${worker.process.pid} 已退出`);
  })
} else {
  new Server().start()

  console.log(`工作进程 ${process.pid} 已启动`)
}
