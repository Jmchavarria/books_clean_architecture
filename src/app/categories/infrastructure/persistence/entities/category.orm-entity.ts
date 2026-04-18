import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { BookOrmEntity } from "src/app/books/infrastructure/persistence/entities/book.orm-entity";

@Entity("categories")
export class CategoryOrmEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

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
