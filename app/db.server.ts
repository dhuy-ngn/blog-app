
import { DataSource } from 'typeorm';
import { PostEntity } from '~/db/entities/post.entity';

const AppDataSource = new DataSource({
  type: "postgres",
  host: "localhost",
  port: 5432,
  username: process.env.VITE_POSTGRES_USER,
  password: process.env.VITE_POSTGRES_PASSWORD,
  database: process.env.VITE_POSTGRES_DB,
  entities: [PostEntity],
  logging: true,
  synchronize: true
});

export default AppDataSource;
