import { registerAs } from '@nestjs/config';
import { HOST, PORT } from './variables';

export default registerAs('common', () => ({
  host: HOST,
  port: PORT,
}));
