/**
 * 
 * @param prefix 控制器prefix
 */
export function controller (prefix?: string): ClassDecorator {
  return function (target: any) {
    prefix = prefix || ''
    if (prefix && !prefix.startsWith('/')) {
      prefix = '/' + prefix
    }
    target._prefix = prefix
  }
}
