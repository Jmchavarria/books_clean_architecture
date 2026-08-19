import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  ManyToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { AuthorsOrmEntity } from 'src/app/authors/infrastructure/persistence/entities/authors.orm-entity';
import { BooksOrmEntity } from 'src/app/books/infrastructure/persistence/entities/books.orm-entity';

@Entity('genres')
export class GenresOrmEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 100, unique: true })
  name: string; // Ej: Terror, Ciencia Ficción, Romántica, Drama, Ensayo

  // Slug único para filtrar por URLs amigables (ej: /generos/ciencia-ficcion)
  @Column({ type: 'varchar', length: 120, unique: true })
  @Index('UQ_genres_slug', { unique: true })
  slug: string;

  @Column({ type: 'text', nullable: true })
  description?: string;

  @Column({ default: true })
  isActive: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  // RELACIONES

  // Relación con Autores (Un género puede estar en muchos autores)
  @ManyToMany(() => AuthorsOrmEntity, (author) => author.genres)
  authors: AuthorsOrmEntity[];

  // Relación con Libros (Un libro puede etiquetarse con varios géneros)
  @ManyToMany(() => BooksOrmEntity, (book) => book.genres)
  books: BooksOrmEntity[];
}
