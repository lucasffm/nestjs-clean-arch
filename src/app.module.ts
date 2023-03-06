import { DatabaseModule } from 'src/infra/database/database.module';

import { Module } from '@nestjs/common';
import { UsersModule } from 'src/infra/ioc/users.module';

@Module({
  imports: [DatabaseModule, UsersModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
