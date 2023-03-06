import { Repository } from 'src/core/base/repository';
import { User } from 'src/core/domain/models/User';

export abstract class UserRepository extends Repository<User> {}
