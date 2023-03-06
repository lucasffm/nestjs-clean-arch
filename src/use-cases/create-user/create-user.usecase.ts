import { Injectable } from '@nestjs/common';
import { UseCase } from 'src/core/base/use-case';
import { User } from 'src/core/domain/models/User';
import { UserRepository } from 'src/core/repositories/user.repository';

import { UserCreateDto } from 'src/shared/dtos/create-user.dto';

@Injectable()
export class CreateUserUseCase implements UseCase<User> {
  constructor(private readonly repository: UserRepository) {}
  async execute(user: UserCreateDto): Promise<User> {
    return this.repository.create(user);
  }
}
