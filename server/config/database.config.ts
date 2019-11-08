import { env } from 'process'
import { Util } from '../src/util/util'

const LOCAL_CONFIG = {
  MYSQL_HOST: '127.0.0.1',
  MYSQL_PORT: 3306,
  MYSQL_DB: 'test',
  MYSQL_USER: 'root',
  MYSQL_PASSWORD: ''
}

const  PRODUCTION_CONFIG = {
  MYSQL_HOST: env.MYSQL_HOST,
  MYSQL_PORT: env.MYSQL_PORT,
  MYSQL_DB: env.MYSQL_DB,
  MYSQL_USER: env.MYSQL_USER,
  MYSQL_PASSWORD: env.MYSQL_PASSWORD
}

export const config = {
  DATABASE: Util.isProduction() ? PRODUCTION_CONFIG : LOCAL_CONFIG
}