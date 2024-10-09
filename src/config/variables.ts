import * as dotenv from 'dotenv';
import * as path from 'path';

dotenv.config({
  path: path.join(path.resolve(), '.env'),
});

export const HOST = process.env.HOST;
export const PORT = +(process.env.PORT || 5000);
export const REDIS_HOST = process.env.REDIS_HOST;
export const REDIS_PORT = +(process.env.REDIS_PORT || 6543);
export const REDIS_PWD = process.env.REDIS_PWD;

export const EXPIRED_TIME = 5;
