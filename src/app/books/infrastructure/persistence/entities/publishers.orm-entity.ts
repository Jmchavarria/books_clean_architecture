import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { BooksOrmEntity } from 'src/app/books/infrastructure/persistence/entities/books.orm-entity';
import { CollectionsOrmEntity } from './collections.orm-entity';

@Entity('publishers')
export class PublishersOrmEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 150 })
  name: string;

  // Slug único para la URL amigable de la editorial (SEO)
  @Column({ type: 'varchar', length: 180, unique: true })
  @Index('UQ_publishers_slug', { unique: true })
  slug: string;

  @Column({ type: 'text', nullable: true })
  description?: string;

  // Logo de la editorial para mostrar en la web
  @Column({ type: 'varchar', length: 500, nullable: true })
  logoUrl?: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  websiteUrl?: string;

  @Column({ type: 'varchar', length: 100, nullable: true })
  country?: string;

  @Column({ default: true })
  isActive: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  // Una editorial publica muchos libros
  @OneToMany(() => BooksOrmEntity, (book) => book.publisher)
  books: BooksOrmEntity[];

  // Una editorial posee muchas colecciones
  @OneToMany(() => CollectionsOrmEntity, (collection) => collection.publisher)
  collections: CollectionsOrmEntity[];
}
