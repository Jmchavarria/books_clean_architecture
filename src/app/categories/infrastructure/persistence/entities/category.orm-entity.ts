import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { BookOrmEntity } from "src/app/books/infrastructure/persistence/entities/book.orm-entity";

@Entity("categories")
@Index(["name"], { unique: true })
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

  @OneToMany(() => BookOrmEntity, (book) => book.category)
  books: BookOrmEntity[];
}
