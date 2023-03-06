import { Module } from '@nestjs/common';
import { UserRepository } from 'src/core/repositories/user.repository';
import { UsersController } from 'src/presentation/http/controllers/users.controller';
import { CreateUserUseCase } from 'src/use-cases/create-user/create-user.usecase';
import { UserRepository as UsersRepositoryImp } from 'src/infra/database/repositories/user.repository';
import { FindUserUseCase } from 'src/use-cases/find-user/find-user.usecase';

@Module({
  imports: [],
  controllers: [UsersController],
  providers: [
    CreateUserUseCase,
    FindUserUseCase,
    { provide: UserRepository, useClass: UsersRepositoryImp },
  ],
})
export class UsersModule {}
