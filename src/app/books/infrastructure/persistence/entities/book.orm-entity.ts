import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { CategoryOrmEntity } from "src/app/categories/infrastructure/persistence/entities/category.orm-entity";
import { AuthorsOrmEntity } from "src/app/authors/infrastructure/persistence/entities/authors.orm-entity";

@Entity("books")
@Index("UQ_books_title_author_published_year", ["title", "authorId", "publishedYear"], { unique: true })
export class BookOrmEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  title: string;

  @Column({ nullable: true, type: "text" })
  description: string | null;

  @Column()
  authorId: string;

  @Column()
  pages: number;

  @Column()
  publishedYear: number;

  @Column({ default: true })
  isActive: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @Column({ type: "varchar", nullable: true })
  categoryId: string | null;

  @ManyToOne(() => CategoryOrmEntity, (category) => category.books, { nullable: true })
  @JoinColumn({ name: "categoryId" })
  category?: CategoryOrmEntity | null;

  @ManyToOne(() => AuthorsOrmEntity, (author) => author.books)
  @JoinColumn({ name: "authorId" })
  author: AuthorsOrmEntity;
}
