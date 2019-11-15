import mysql from 'mysql'
import { config } from '../../config'

export abstract class Service {
  private pool: mysql.Pool = mysql.createPool({
    host: config.DATABASE.MYSQL_HOST,
    port: config.DATABASE.MYSQL_PORT,
    user: config.DATABASE.MYSQL_USER,
    password: config.DATABASE.MYSQL_PASSWORD,
    database: config.DATABASE.MYSQL_DB,
    connectionLimit: 15,
  })

  protected execSql (sql: string, value?: any) {
    return new Promise((resolve, reject) => {
      this.pool.getConnection((err, conn) => {
        if (err) reject(err)
        conn.query(sql, value, function (err, results, fields) {
          if (err) reject(err)
          resolve(results)
          conn.release()
        })
      })
    })
  }
}
