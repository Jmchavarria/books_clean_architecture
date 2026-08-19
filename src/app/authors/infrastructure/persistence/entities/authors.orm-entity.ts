import { BooksOrmEntity } from 'src/app/books/infrastructure/persistence/entities/books.orm-entity';
import { GenresOrmEntity } from 'src/app/genres/infrastructure/persistence/entities/genres.orm-entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  JoinTable,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('authors')
export class AuthorsOrmEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 150 })
  firstName: string;

  @Column({ type: 'varchar', length: 150, nullable: true })
  lastName?: string;

  // Slug único para la URL del perfil del autor (SEO)
  @Column({ type: 'varchar', length: 255, unique: true })
  @Index('UQ_authors_slug', { unique: true })
  slug: string;

  @Column({ type: 'date', nullable: true })
  birthdate?: Date;

  @Column({ type: 'date', nullable: true })
  deathdate?: Date;

  @Column({ type: 'text', nullable: true })
  biography?: string;

  @Column({ type: 'varchar', length: 100, nullable: true })
  countryOfBirth?: string;

  @Column({ type: 'varchar', length: 500, nullable: true })
  photoUrl?: string;

  @Column({ default: true })
  isActive: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  // Un autor escribe muchos libros
  @OneToMany(() => BooksOrmEntity, (book) => book.author)
  books: BooksOrmEntity[];

  // Un autor puede asociarse a múltiples géneros literarios
  @ManyToMany(() => GenresOrmEntity, (genre) => genre.authors)
  @JoinTable({
    name: 'author_genres',
    joinColumn: { name: 'author_id', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'genre_id', referencedColumnName: 'id' },
  })
  genres: GenresOrmEntity[];
}
