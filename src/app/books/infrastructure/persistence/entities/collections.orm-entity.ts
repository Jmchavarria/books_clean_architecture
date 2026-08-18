import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { PublishersOrmEntity } from 'src/app/books/infrastructure/persistence/entities/publishers.orm-entity'; // Ajusta la ruta
import { BooksOrmEntity } from 'src/app/books/infrastructure/persistence/entities/books.orm-entity'; // Ajusta la ruta

@Entity('collections')
export class CollectionsOrmEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ nullable: true, type: 'text' })
  description: string;

  @Column({ default: true })
  isActive: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  // 1. Columna física de la llave foránea hacia la editorial
  @Column({ type: 'int' })
  publisherId: number;

  // Relación: Muchas colecciones pertenecen a una Editorial
  @ManyToOne(() => PublishersOrmEntity, (publisher) => publisher.collections, {
    nullable: false, // Una colección no puede existir sin una editorial
    onDelete: 'CASCADE', // Si se elimina la editorial, se eliminan sus colecciones
  })
  @JoinColumn({ name: 'publisherId' })
  publisher: PublishersOrmEntity;

  // 2. Relación: Una colección agrupa muchos libros
  @OneToMany(() => BooksOrmEntity, (book) => book.collection)
  books: BooksOrmEntity[];
}
