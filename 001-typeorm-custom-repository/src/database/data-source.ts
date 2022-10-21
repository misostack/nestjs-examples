import { DataSource } from 'typeorm';
import entities from '../entities';
export const AppDataSource = new DataSource({
  type: 'mysql',
  url: 'mysql://root:123456@localhost:3306/nestjs_examples',
  synchronize: false,
  logging: false,
  entities,
  migrations: ['./src/database/migrations/*.ts'],
  subscribers: [],
});
