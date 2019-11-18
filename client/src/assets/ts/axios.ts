import axios from 'axios'

const baseURL: string = ''

const service = axios.create({
  baseURL: baseURL
})

service.interceptors.request.use(
  function (config) {
    const token: string | null = window.sessionStorage.getItem('token')
    if (token) {
      config.headers.authorization = token
    }
    return config
  },
  function (error) {
    return Promise.reject(error)
  }
)

service.interceptors.response.use(
  function (response) {
    const newToken: string = response.headers.authorization
    console.log('newToken', newToken)
    return response
  },
  function (error) {
    console.log(error)
    return Promise.reject(error)
  }
)

export {
  service as axios
}
