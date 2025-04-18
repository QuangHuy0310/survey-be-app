import { registerAs } from '@nestjs/config';
import { configs } from './config';

export default registerAs('redis', () => ({
  url: configs.redis,
  ttl: parseInt(configs.redis_ttl || '60', 10),
}));
