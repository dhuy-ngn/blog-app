
import { DataSource } from 'typeorm';
import { PostEntity } from '~/db/entities/post.entity';

const AppDataSource = new DataSource({
  type: "postgres",
  host: "localhost",
  port: 5432,
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DB,
  entities: [PostEntity],
  logging: true,
  synchronize: true
});

export default AppDataSource;
