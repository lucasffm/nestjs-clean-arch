import * as dotenv from 'dotenv';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';

const env = dotenv.parse('../../');
dotenv.config(env);

module.exports = {
  type: 'postgres',
  host: process.env.DB_HOST,
  port: +process.env.DB_PORT,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  synchronize: false,
  namingStrategy: new SnakeNamingStrategy(), // Here you'r using the strategy!
  entities: [__dirname + '/src/**/*.entity{.ts,.js}'],
  migrations: [__dirname + '/src/infra/database/migrations/*{.ts,.js}'],
  seeds: [__dirname + '/src/infra/database/**/*.seed{.ts,.js}'],
  factories: [__dirname + '/src/infra/database/**/*.factory{.ts,.js}'],
  cli: {
    migrationsDir: 'src/infra/database/migrations',
  },
  extra: {
    ssl: {
      rejectUnauthorized: false,
    },
  },
};