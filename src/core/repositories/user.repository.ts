import { Repository } from 'src/core/base/repository';
import { User } from 'src/core/domain/models/User';

export abstract class IUserRepository extends Repository<User> {}
