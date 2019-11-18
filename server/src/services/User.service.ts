import { Service } from './Service'
import { User } from '../models'

export class UserService extends Service {
  saveUser (user: User) {
    const sql: string = `INSERT INTO user VALUES(null, ?, ?, ?)`
    this.execSql(sql, [user.name, user.password, user.token])
  }

  public async findOne (data: { name: string, password: string }): Promise<User> {
    const sql: string = `SELECT * FROM user WHERE name = ? AND password = ?`
    let users: Array<User> = await this.execSql(sql, [data.name, data.password]) as Array<User>
    return users[0]
  }

  public udateUserToken (token: string, user: User) {
    const sql: string = `UPDATE user SET token = ? WHERE id = ?`
    this.execSql(sql, [token, user.id])
  }
}
