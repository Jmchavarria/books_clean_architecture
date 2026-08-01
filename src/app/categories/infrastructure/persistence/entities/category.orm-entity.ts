import { BooksOrmEntity } from 'src/app/books/infrastructure/persistence/entities/books.orm-entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('categories')
@Index(['name'], { unique: true })
export class CategoryOrmEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ default: true })
  isActive: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @OneToMany(() => BooksOrmEntity, (book) => book.category)
  books: BooksOrmEntity[];
}
