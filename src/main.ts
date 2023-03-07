import { Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { RedisIoAdapter } from 'src/infra/redis-adapter/redis-io.adapter';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);

  await app.listen(configService.get('SERVICEPORT') || 3000);
  const redisIoAdapter = new RedisIoAdapter(app, configService);
  await redisIoAdapter.connectToRedis();

  app.useWebSocketAdapter(redisIoAdapter);

  Logger.log(
    `🚀 Server listening on port: ${
      configService.get('SERVICEPORT') || 3000
    } 🚀`,
    'NestApplication',
  );
}
bootstrap();
