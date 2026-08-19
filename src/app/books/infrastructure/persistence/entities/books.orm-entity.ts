import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { CategoryOrmEntity } from 'src/app/categories/infrastructure/persistence/entities/category.orm-entity';
import { AuthorsOrmEntity } from 'src/app/authors/infrastructure/persistence/entities/authors.orm-entity';
import { CollectionsOrmEntity } from './collections.orm-entity';
import { PublishersOrmEntity } from './publishers.orm-entity';
import { BookFormat } from 'src/app/books/domain/enums/book-format.enum';
import { GenresOrmEntity } from 'src/app/genres/infrastructure/persistence/entities/genres.orm-entity';

@Entity('books')
@Index('UQ_books_title_author_published_year', ['title', 'authorId', 'publishedYear'], {
  unique: true,
})
export class BooksOrmEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255 })
  title: string;

  @Column({ type: 'varchar', length: 255, unique: true })
  slug: string;

  @Column({ nullable: true, type: 'text' })
  description: string;

  // Precios en formato decimal/numeric para evitar errores de redondeo flotante
  @Column({ type: 'decimal', precision: 10, scale: 2 })
  price: number;

  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: true })
  discountPrice?: number;

  @Column({ type: 'int', default: 0 })
  stock: number;

  @Column({ type: 'varchar', length: 20, unique: true, nullable: true })
  isbn?: string;

  @Column({
    type: 'enum',
    enum: BookFormat,
    default: BookFormat.PAPERBACK,
  })
  format: BookFormat;

  @Column({ type: 'varchar', length: 500, nullable: true })
  coverImageUrl?: string;

  @Column({ type: 'int', nullable: true })
  pages?: number;

  @Column({ type: 'int', nullable: true })
  publishedYear?: number;

  @Column({ type: 'varchar', length: 10, default: 'es' })
  language: string;

  // Peso en gramos para el cálculo de envíos
  @Column({ type: 'int', nullable: true })
  weightInGrams?: number;

  @Column({ default: true })
  isActive: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  // RELACIONES

  @Column({ type: 'int' })
  categoryId: number;

  @ManyToOne(() => CategoryOrmEntity, (category) => category.books)
  @JoinColumn({ name: 'categoryId' })
  category: CategoryOrmEntity;

  @Column({ type: 'int' })
  authorId: number;

  @ManyToOne(() => AuthorsOrmEntity, (author) => author.books)
  @JoinColumn({ name: 'authorId' })
  author: AuthorsOrmEntity;

  @Column({ type: 'int', nullable: true })
  publisherId?: number;

  @ManyToOne(() => PublishersOrmEntity, (publisher) => publisher.books, {
    onDelete: 'RESTRICT',
    nullable: true,
  })
  @JoinColumn({ name: 'publisherId' })
  publisher?: PublishersOrmEntity;

  @Column({ type: 'int', nullable: true })
  collectionId?: number;

  @ManyToOne(() => CollectionsOrmEntity, (collection) => collection.books, {
    nullable: true,
  })
  @JoinColumn({ name: 'collectionId' })
  collection?: CollectionsOrmEntity;

  @ManyToMany(() => GenresOrmEntity, (genre) => genre.books)
  @JoinTable({
    name: 'book_genres',
    joinColumn: { name: 'book_id', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'genre_id', referencedColumnName: 'id' },
  })
  genres: GenresOrmEntity[];
}
