import { Injectable } from '@nestjs/common';
import { InjectDataSource } from '@nestjs/typeorm';
import { User } from 'src/core/domain/models/User';
import { UserEntity } from 'src/infra/database/entities/user.entity';
import { BaseRepositoryTypeorm } from 'src/infra/database/repositories/base.repository';
import { DataSource } from 'typeorm';

@Injectable()
export class UserRepositoryTypeorm extends BaseRepositoryTypeorm<User> {
  constructor(@InjectDataSource() connection: DataSource) {
    super(connection, UserEntity);
  }
}
