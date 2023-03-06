import { IUserRepository } from 'src/core/repositories/user.repository';
import { UserRepositoryTypeorm } from 'src/infra/database/repositories/user.repository';
import { UsersController } from 'src/presentation/http/controllers/users.controller';
import { CreateUserUseCase } from 'src/use-cases/create-user/create-user.usecase';
import { FindUserUseCase } from 'src/use-cases/find-user/find-user.usecase';

import { Module } from '@nestjs/common';
import { AmqpModule } from 'src/infra/amqp/amqp.module';

@Module({
  imports: [AmqpModule],
  controllers: [UsersController],
  providers: [
    { provide: IUserRepository, useClass: UserRepositoryTypeorm },
    CreateUserUseCase,
    FindUserUseCase,
  ],
})
export class UsersModule {}
