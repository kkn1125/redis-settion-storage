import { EXPIRED_TIME } from '@config/variables';
import { PrismaService } from '@database/prisma.service';
import { RedisService } from '@liaoliaots/nestjs-redis';
import { Injectable, NotFoundException } from '@nestjs/common';
import Redis from 'ioredis';

@Injectable()
export class AuthService {
  private readonly redis: Redis | null;
  constructor(
    private client: RedisService,
    private prisma: PrismaService,
  ) {
    this.redis = client.getOrThrow();
  }

  async login(email: string, password: string) {
    const { has, user } = await this.prisma.hasUser(email, password);

    if (!has) {
      throw new NotFoundException('not found user');
    }

    const createdLoginLog = await this.prisma.loginLog.create({
      data: {
        userId: user.id,
      },
    });
    const timestamp = Math.floor(Date.now() / 60 / 1000) * 60 * 1000;
    const hmacToken = this.prisma.createHMacToken(email, timestamp);
    await this.redis.set(email, hmacToken, (err, result) => {
      console.log(err, result);
    });

    console.log('log check:', createdLoginLog);
    return email;
  }

  async checkSession(email: string) {
    const hmac = await this.redis.get(email);
    if (hmac) {
      const currentTime = Math.floor(Date.now() / 60 / 1000) * 60 * 1000;
      for (let i = 0; i < EXPIRED_TIME; i++) {
        const time = i * 60 * 1000;
        const compareToken = this.prisma.createHMacToken(
          email,
          currentTime - time,
        );
        if (hmac === compareToken) {
          return true;
        }
      }
    }
    return false;
  }
}
