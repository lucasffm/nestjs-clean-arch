import { DataSource, DataSourceOptions } from 'typeorm';
import { config } from 'dotenv';

config();

const datasource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT, 10),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  synchronize: false,
  migrations: [__dirname + '/../migrations/*.{ts,js}'],
  entities: [__dirname + '/../**/entities/*.{ts,js}'],
} as DataSourceOptions);
datasource.initialize();
export default datasource;
