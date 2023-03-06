import { Model } from 'src/core/base/model';

export class User extends Model {
  public name: string;
  public password: string;
  public email: string;
}
