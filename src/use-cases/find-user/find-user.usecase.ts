import { AmqpConnection } from '@golevelup/nestjs-rabbitmq';
import { Injectable } from '@nestjs/common';
import { UseCase } from 'src/core/base/use-case';
import { User } from 'src/core/domain/models/User';
import { IUserRepository } from 'src/core/repositories/user.repository';

@Injectable()
export class FindUserUseCase implements UseCase<User> {
  constructor(
    private readonly repository: IUserRepository,
    private readonly amqpConnection: AmqpConnection,
  ) {}

  async execute(filters: Partial<User>): Promise<User[]> {
    const users = await this.repository.getMany(filters);
    await this.amqpConnection.publish('test', 'test', users);
    return users;
  }
}
