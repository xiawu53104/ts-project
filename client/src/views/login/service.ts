import { AxiosStatic } from 'axios'

export class Service {
  private $http!: AxiosStatic

  constructor (http: AxiosStatic) {
    this.$http = http
  }

  public async doLogin (data: { username: string, password: string }) {
    let res = await this.$http({
      method: 'post',
      url: '/api/user/login',
      data
    })
    return res.data
  }
}
