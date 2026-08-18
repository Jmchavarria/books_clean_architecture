import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { CollectionsOrmEntity } from './collections.orm-entity'; // Ajusta la ruta
import { BooksOrmEntity } from './books.orm-entity';

@Entity('publishers')
export class PublishersOrmEntity {
  @PrimaryGeneratedColumn()
  id: number;

  // 1. Nombre oficial de la editorial (ej. "Penguin Random House")
  @Column({ unique: true })
  name: string;

  // 2. Breve reseña o información de la empresa
  @Column({ nullable: true, type: 'text' })
  description: string;

  // 3. Sitio web oficial (útil para el frontend o catalogación)
  @Column({ nullable: true })
  website: string;

  // 4. País de origen o fundación (muy usado en filtros de búsqueda)
  @Column({ nullable: true, length: 100 })
  country: string;

  // 5. Estado de la editorial (por si deja de operar)
  @Column({ default: true })
  isActive: boolean;

  // 6. Auditoría estándar (igual que tus otras tablas)
  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @OneToMany(() => BooksOrmEntity, (book) => book.publisher)
  books: BooksOrmEntity[];

  // 7. Relación: Una editorial tiene muchas colecciones
  @OneToMany(() => CollectionsOrmEntity, (collection) => collection.publisher)
  collections: CollectionsOrmEntity[];
}
