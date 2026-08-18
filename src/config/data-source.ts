import { DataSource } from 'typeorm';
import 'dotenv/config';
export const AppDataSource = new DataSource({
  type: 'mysql',
  host: process.env.DB_HOST,
  port: 3306,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  synchronize: false,
  logging: true,
  entities: ['src/**/*.orm-entity.{ts,js}'],
  migrations: [__dirname + '/migration/*.ts'],
});
