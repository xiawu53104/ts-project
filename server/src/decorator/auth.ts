/**
 * 是否需要验证登录权限
 */
export function auth () {
  return function (target: any, propName: string, descriptor: any) {
    target.constructor._auth = target.constructor._auth || []
    target.constructor._auth.push(propName)
  }
}