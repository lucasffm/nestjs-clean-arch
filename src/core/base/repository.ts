import { Model } from './model';

export abstract class Repository<T extends Model> {
  abstract create(data: T): Promise<T>;
  abstract update(id: any, data: T): Promise<T>;
  abstract patch(id: number, data: Partial<T>): Promise<T>;
  abstract getById(id: number): Promise<T>;
  abstract getAll(): Promise<T[]>;
  abstract getOne(filter: Partial<T>): Promise<T>;
  abstract getMany(filter: Partial<T>): Promise<T[]>;
  abstract delete(id: number): Promise<void>;
}
