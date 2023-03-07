import * as Joi from 'joi';
import { AmqpModule } from 'src/infra/amqp/amqp.module';
import { DatabaseModule } from 'src/infra/database/database.module';
import { UsersModule } from 'src/infra/ioc/users.module';
import { SocketIOModule } from 'src/infra/socket-io/socket-io.module';

import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      validationSchema: Joi.object({
        SERVICEPORT: Joi.string().default(3000),
        DB_HOST: Joi.string().required(),
        DB_PORT: Joi.string().required(),
        DB_USERNAME: Joi.string().required(),
        DB_PASSWORD: Joi.string().required(),
        DB_NAME: Joi.string().required(),
        AMQP_USERNAME: Joi.string().required(),
        AMQP_PASSWORD: Joi.string().required(),
        AMQP_HOST: Joi.string().required(),
        AMQP_PORT: Joi.string().required(),
        AMQP_VHOST: Joi.string().required(),
        REDIS_URL: Joi.string().required(),
      }),
    }),
    DatabaseModule,
    AmqpModule,
    SocketIOModule,
    UsersModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
