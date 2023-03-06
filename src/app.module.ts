import { DatabaseModule } from 'src/infra/database/database.module';

import { Module } from '@nestjs/common';
import { UsersModule } from 'src/infra/ioc/users.module';
import { AmqpModule } from 'src/infra/amqp/amqp.module';

@Module({
  imports: [DatabaseModule, AmqpModule, UsersModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
