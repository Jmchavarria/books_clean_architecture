import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { BooksOrmEntity } from 'src/app/books/infrastructure/persistence/entities/books.orm-entity';
import { PublishersOrmEntity } from './publishers.orm-entity';

@Entity('collections')
export class CollectionsOrmEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 150 })
  name: string;

  // Slug único para URLs amigables de la colección en la tienda
  @Column({ type: 'varchar', length: 180, unique: true })
  @Index('UQ_collections_slug', { unique: true })
  slug: string;

  @Column({ nullable: true, type: 'text' })
  description?: string;

  // Imagen promocional o portada de la colección
  @Column({ type: 'varchar', length: 500, nullable: true })
  coverImageUrl?: string;

  @Column({ default: true })
  isActive: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  // RELACIONES

  // Columna física FK hacia la editorial
  @Column({ type: 'int' })
  publisherId: number;

  // Muchas colecciones pertenecen a una Editorial
  @ManyToOne(() => PublishersOrmEntity, (publisher) => publisher.collections, {
    nullable: false,
    onDelete: 'RESTRICT', // Protege la colección de borrados accidentales de la editorial
  })
  @JoinColumn({ name: 'publisherId' })
  publisher: PublishersOrmEntity;

  // Una colección agrupa muchos libros
  @OneToMany(() => BooksOrmEntity, (book) => book.collection)
  books: BooksOrmEntity[];
}
