import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class PostEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: 'text' })
  title!: string;

  @Column({ type: 'text' })
  content!: string;
}