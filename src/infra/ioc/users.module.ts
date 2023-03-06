import { Module } from '@nestjs/common';
import { UserRepository } from 'src/core/repositories/user.repository';
import { UsersController } from 'src/presentation/http/controllers/users.controller';
import { CreateUserUseCase } from 'src/use-cases/create-user/create-user.usecase';
import { UserRepository as UsersRepositoryImp } from 'src/infra/database/repositories/user.repository';

@Module({
  imports: [],
  controllers: [UsersController],
  providers: [
    CreateUserUseCase,
    { provide: UserRepository, useClass: UsersRepositoryImp },
  ],
})
export class UsersModule {}
