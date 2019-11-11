export type METHOD = 'get' | 'post' | 'put' | 'delete'

/**
 * 
 * @param path 路由路径描述
 * @param method 请求方式
 */
export function http (path: string, method: METHOD) {
  return function (target: any, propName: string, descriptor: any) {
    target.constructor._routes = target.constructor._routes || []
    if (path && !path.startsWith('/')) {
      path = '/' + path
    }
    target.constructor._routes.push({
      path,
      method,
      fnName: propName,
      handler: descriptor.value
    })
  }
}
