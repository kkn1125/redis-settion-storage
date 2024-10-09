import { Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { RedisModule } from '@liaoliaots/nestjs-redis';
import redisConf from '@config/redis.conf';

@Module({
  imports: [
    RedisModule.forRoot({
      readyLog: true,
      config: {
        host: redisConf().host,
        port: redisConf().port,
        password: '1234',
        retryStrategy: null,
        maxRetriesPerRequest: 20,
      },
    }),
  ],
  providers: [PrismaService],
  exports: [PrismaService],
})
export class DatabaseModule {}
