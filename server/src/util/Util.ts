export class Util {
  public static isProduction (): boolean {
    return process.env.NODE_ENV === 'production'
  }
}