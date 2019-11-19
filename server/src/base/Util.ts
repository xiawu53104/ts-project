export class Util {
  public static isProduction (): boolean {
    return process.env.NODE_ENV === 'production'
  }

  public static formatDate (date: Date, fmt: string): string {
    let m: Map<string, number> = new Map<string, number>()
    m.set("M+", date.getMonth() + 1)
    m.set("d+", date.getDate())
    m.set("h+", date.getHours())
    m.set("m+", date.getMinutes())
    m.set("s+", date.getSeconds())
    m.set("q+", Math.floor((date.getMonth() + 3) / 3))
    m.set("S", date.getMilliseconds())
    if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length))
    for (let k of m.keys()) {
      if (new RegExp("(" + k + ")").test(fmt)) {
        let s = m.get(k)
        fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (s + '') : (("00" + s).substr(("" + s).length)))
      }
    }
    return fmt
  }
}