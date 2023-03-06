import { Module } from '@nestjs/common';
import { IUserRepository } from 'src/core/repositories/user.repository';
import { UsersController } from 'src/presentation/http/controllers/users.controller';
import { CreateUserUseCase } from 'src/use-cases/create-user/create-user.usecase';
import { UserRepositoryTypeorm } from 'src/infra/database/repositories/user.repository';
import { FindUserUseCase } from 'src/use-cases/find-user/find-user.usecase';

@Module({
  imports: [],
  controllers: [UsersController],
  providers: [
    { provide: IUserRepository, useClass: UserRepositoryTypeorm },
    CreateUserUseCase,
    FindUserUseCase,
  ],
})
export class UsersModule {}
