import { Body, Controller, Post } from '@nestjs/common';
import { User } from 'src/core/domain/models/User';
import { UserCreateDto } from 'src/shared/dtos/create-user.dto';
import { CreateUserUseCase } from 'src/use-cases/create-user/create-user.usecase';

@Controller('/users')
export class UsersController {
  constructor(private createUserUserCase: CreateUserUseCase) {}

  @Post()
  public create(@Body() user: UserCreateDto): Promise<User> {
    return this.createUserUserCase.execute(user);
  }
}
