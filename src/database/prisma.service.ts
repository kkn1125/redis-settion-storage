import { Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { isNil } from '@src/util/isNil';
import * as crypto from 'crypto';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  async onModuleInit() {
    await this.$connect();
  }

  encodePassword(email: string, password: string) {
    const hash = crypto.createHash('sha256');
    const payload = email + '|' + password;
    hash.update(payload);
    const encodedPassword = hash.digest('hex');
    return encodedPassword;
  }

  get timestamp() {
    return new Date().getTime();
  }

  createHMacToken(email: string, timestamp: number) {
    const hash = crypto.createHash('sha256');
    hash.update(email);
    const hashedPayload = hash.digest('hex');
    const hmac = crypto.createHmac('sha256', hashedPayload + '|' + timestamp);
    return hmac.digest('hex');
  }

  async hasUser(email: string, password: string) {
    const encodedPassword = this.encodePassword(email, password);
    const foundUser = await this.user.findFirst({
      where: { email, password: encodedPassword },
    });

    return {
      has: !isNil(foundUser),
      user: foundUser,
    };
  }
}
