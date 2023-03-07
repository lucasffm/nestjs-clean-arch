import { Module } from '@nestjs/common';
import { SocketIOGateway } from 'src/infra/socket-io/socket-io.gateway';
import { createClient } from 'redis';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [ConfigModule],
  providers: [
    {
      provide: 'RedisClient',
      useFactory: (configService: ConfigService) => {
        return createClient({ url: configService.get('REDIS_URL') });
      },
      inject: [ConfigService],
    },
    SocketIOGateway,
  ],
  exports: [SocketIOGateway],
})
export class SocketIOModule {}
