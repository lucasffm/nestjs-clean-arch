import { AmqpConnection, RabbitMQModule } from '@golevelup/nestjs-rabbitmq';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { SampleConsumer } from 'src/presentation/amqp/sample.consumer';

@Module({
  imports: [
    RabbitMQModule.forRootAsync(RabbitMQModule, {
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        return {
          exchanges: [],
          uri: `amqp://${configService.get(
            'AMQP_USERNAME',
          )}:${configService.get('AMQP_PASSWORD')}@${configService.get(
            'AMQP_HOST',
          )}:${configService.get('AMQP_PORT')}${configService.get(
            'AMQP_VHOST',
          )}`,
          connectionInitOptions: { wait: true },
        };
      },
    }),
  ],
  providers: [SampleConsumer],
  exports: [RabbitMQModule],
})
export class AmqpModule {}
