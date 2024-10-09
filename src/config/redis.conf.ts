import { registerAs } from '@nestjs/config';
import { REDIS_HOST, REDIS_PORT, REDIS_PWD } from './variables';

export default registerAs('redis', () => ({
  host: REDIS_HOST,
  port: REDIS_PORT,
  password: REDIS_PWD,
}));
