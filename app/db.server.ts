import { DataSource } from 'typeorm';
import { Post } from '~/db/entities/post.entity';

const AppDataSource = new DataSource({
  type: "postgres",
  host: "localhost",
  port: 5432,
  username: import.meta.env.VITE_POSTGRES_USER,
  password: import.meta.env.VITE_POSTGRES_PASSWORD,
  database: import.meta.env.VITE_POSTGRES_DB,
  entities: [Post],
  logging: true,
  synchronize: true
});

export default AppDataSource;
