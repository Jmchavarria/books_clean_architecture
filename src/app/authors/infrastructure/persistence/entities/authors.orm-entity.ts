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

@Entity('authors')
@Index(['name'], { unique: true })
export class AuthorsOrmEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  lastName: string;

  @Column()
  birthdate: Date;

  @Column({ nullable: true, type: 'text' })
  biography: string;

  @Column()
  countryOfBirth: string;

  @Column({ type: 'varchar', nullable: true })
  literaryGenre: string; //DEBERIA SER UNA RELACION DE MUCHOS A MUCHOS

  @Column({ default: true })
  isActive: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @OneToMany(() => BooksOrmEntity, (book) => book.author)
  books: BooksOrmEntity[];
}
