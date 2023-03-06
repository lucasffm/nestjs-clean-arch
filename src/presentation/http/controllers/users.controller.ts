import { Body, Controller, Get, Post, Query, Req } from '@nestjs/common';
import { User } from 'src/core/domain/models/User';
import { UserCreateDto } from 'src/shared/dtos/create-user.dto';
import { CreateUserUseCase } from 'src/use-cases/create-user/create-user.usecase';
import { FindUserUseCase } from 'src/use-cases/find-user/find-user.usecase';

@Controller('/users')
export class UsersController {
  constructor(
    private createUserUserCase: CreateUserUseCase,
    private findUserUseCase: FindUserUseCase,
  ) {}

  @Post()
  public async create(@Body() user: UserCreateDto): Promise<User> {
    const data = await this.createUserUserCase.execute(user);
    return data;
  }

  @Get()
  public async find(@Query() query: Partial<User>): Promise<User[]> {
    const users = await this.findUserUseCase.execute(query);
    return users;
  }
}
