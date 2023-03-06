import { Repository } from 'src/core/base/repository';
import {
  DataSource,
  EntityManager,
  EntitySchema,
  ObjectLiteral,
  QueryRunner,
} from 'typeorm';

export class BaseRepository<T extends ObjectLiteral> implements Repository<T> {
  private entitySchema: any;
  private manager: EntityManager;
  private queryRunner: QueryRunner;

  constructor(connection: DataSource, entity: EntitySchema<T>) {
    this.manager = connection.createQueryRunner().manager;
    this.entitySchema = entity;
  }

  async create(data: T): Promise<T> {
    const toSave = this.manager.create(this.entitySchema, data);
    return this.manager.save(toSave);
  }

  async update(id: number, data: T): Promise<T> {
    const updated = await this.manager.update(this.entitySchema, id, data);
    if (!updated.affected) {
      throw new Error('Cannot update register');
    }
    return data;
  }
  patch(id: number, data: T): Promise<T> {
    throw new Error('Method not implemented.');
  }
  getById(id: number): Promise<T> {
    return this.manager.getId(id);
  }
  getAll(): Promise<T[]> {
    throw new Error('Method not implemented.');
  }
  getOne(filter: T): Promise<T> {
    return this.manager.findOne<T>(this.entitySchema, filter);
  }
  getMany(filter: T): Promise<T[]> {
    return this.manager.find<T>(this.entitySchema, { where: filter });
  }

  delete(id: number): Promise<void> {
    throw new Error('Method not implemented.');
  }
}
