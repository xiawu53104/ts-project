import { Service } from './Service'
import { User } from '../models'

export class UserService extends Service {
  saveUser (user: User) {
    const sql: string = `INSERT INTO user VALUES(null, ?, ?, ?)`
    this.execSql(sql, [user.name, user.password, user.token])
  }
}
