import mysql from 'mysql'
import { config } from '../../config'

export abstract class Service {
  private connection: mysql.Connection = mysql.createConnection({
    host: config.DATABASE.MYSQL_HOST,
    port: config.DATABASE.MYSQL_PORT,
    user: config.DATABASE.MYSQL_USER,
    password: config.DATABASE.MYSQL_PASSWORD,
    database: config.DATABASE.MYSQL_DB
  })

  protected execSql (sql: string, value?: any) {
    return new Promise((resolve, reject) => {
      this.connection.connect()
      this.connection.query(sql, value, function (err, results, fields) {
        if (err) reject(err)
        resolve(results)
      })
      this.connection.end()
    })
  }
}
