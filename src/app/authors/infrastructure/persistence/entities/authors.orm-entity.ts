import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { BookOrmEntity } from "src/app/books/infrastructure/persistence/entities/book.orm-entity";

@Entity("authors")
export class AuthorsOrmEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  name: string;

  @Column()
  lastname: string;

  @Column()
  birthdate: Date;

  @Column({ nullable: true, type: "text" })
  biography: string ;

  @Column()
  countryOfBirth: string;

  @Column({ type: "varchar", nullable: true })
  literaryGenre: string ;

  @Column({ default: true })
  isActive: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @OneToMany(() => BookOrmEntity, (book) => book.author)
  books: BookOrmEntity[];
}
