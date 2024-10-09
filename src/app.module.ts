import commonConf from '@config/common.conf';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { DatabaseModule } from './database/database.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    UsersModule,
    AuthModule,
    DatabaseModule,
    ConfigModule.forRoot({
      load: [commonConf],
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
