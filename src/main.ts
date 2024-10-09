import commonConf from '@config/common.conf';
import { ConfigService, ConfigType } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Request } from 'express';
import { ResponseInterceptor } from './response/response.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const httpAdapter = app.getHttpAdapter();
  httpAdapter.use((req: Request, _, next) => {
    const method = req.method;
    const originalUrl = req.originalUrl;
    console.log(`[LOG] [${method}] ${originalUrl} --->`);
    next();
  });
  app.enableCors({
    origin: '*',
  });
  app.setGlobalPrefix('/api');
  app.useGlobalInterceptors(new ResponseInterceptor());

  const configService = app.get(ConfigService);
  const commonConfig =
    configService.get<ConfigType<typeof commonConf>>('common');

  const host = commonConfig.host;
  const port = commonConfig.port;

  await app.listen(port, host, () => {
    console.log(`server listening on http://localhost:${port}`);
  });
}
bootstrap();
