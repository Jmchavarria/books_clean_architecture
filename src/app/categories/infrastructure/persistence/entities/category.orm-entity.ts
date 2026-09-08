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
import { StatusTypeEnum } from 'src/app/common/enums/status.type.enum';

@Entity('categories')
export class CategoryOrmEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 100, unique: true })
  @Index('UQ_categories_name', { unique: true })
  name: string;

  @Column({ type: 'varchar', length: 120, unique: true })
  @Index('UQ_categories_slug', { unique: true })
  slug: string;

  @Column({ type: 'text', nullable: true })
  description?: string;

  @Column({
    type: 'enum',
    enum: StatusTypeEnum,
    default: StatusTypeEnum.ACTIVE,
  })
  status: StatusTypeEnum;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  // Una categoría puede tener múltiples libros asociados
  @OneToMany(() => BooksOrmEntity, (book) => book.category)
  books: BooksOrmEntity[];
}
