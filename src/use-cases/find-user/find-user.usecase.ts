import { Injectable } from '@nestjs/common';
import { UseCase } from 'src/core/base/use-case';
import { User } from 'src/core/domain/models/User';
import { IUserRepository } from 'src/core/repositories/user.repository';

@Injectable()
export class FindUserUseCase implements UseCase<User> {
  constructor(private readonly repository: IUserRepository) {}
  async execute(filters: Partial<User>): Promise<User[]> {
    return this.repository.getMany(filters);
  }
}
