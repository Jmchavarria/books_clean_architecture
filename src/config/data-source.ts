import { DataSource } from 'typeorm';
import 'dotenv/config';

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST,
  port: 5432,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  synchronize: false,
  logging: true,
  // 🔽 Rutas corregidas basándose en la ubicación real de tus carpetas
  entities: [__dirname + '/../**/*.orm-entity.{ts,js}'],
  migrations: [__dirname + '/../database/migrations/*.{ts,js}'],
});
