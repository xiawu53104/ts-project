import JWT from 'jsonwebtoken'
import { config } from '../../config'

export class JWTService {
  public signToken (params: { name: string, id: number }, options?: any): string {
    return JWT.sign(params, config.SECRET, options || undefined)
  }
}