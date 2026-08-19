import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { BooksOrmEntity } from 'src/app/books/infrastructure/persistence/entities/books.orm-entity';
import { UsersOrmEntity } from 'src/app/users/infrastructure/persistence/entities/users.orm-entity';

@Entity('book_reviews')
// Un usuario solo debe poder calificar/reseñar un mismo libro una sola vez
@Index('UQ_reviews_user_book', ['userId', 'bookId'], { unique: true })
export class BookReviewOrmEntity {
  @PrimaryGeneratedColumn()
  id: number;

  // RELACIÓN CON EL LIBRO
  @Column({ type: 'int' })
  bookId: number;

  @ManyToOne(() => BooksOrmEntity, {
    onDelete: 'CASCADE', // Si se elimina el libro, se eliminan sus reseñas
  })
  @JoinColumn({ name: 'bookId' })
  book: BooksOrmEntity;

  // RELACIÓN CON EL USUARIO
  @Column({ type: 'int' })
  userId: number;

  @ManyToOne(() => UsersOrmEntity, (user) => user.reviews, {
    onDelete: 'CASCADE', // Si se elimina el usuario, se eliminan sus reseñas
  })
  @JoinColumn({ name: 'userId' })
  user: UsersOrmEntity;

  // CALIFICACIÓN Y COMENTARIO
  // Puntuación de 1 a 5 estrellas
  @Column({ type: 'smallint' })
  rating: number;

  // Título corto o titular de la opinión (Ej: "¡Excelente libro, muy recomendado!")
  @Column({ type: 'varchar', length: 150, nullable: true })
  title?: string;

  // Contenido detallado de la reseña
  @Column({ type: 'text', nullable: true })
  comment?: string;

  // ATRIBUTOS DE NEGOCIO Y MODERACIÓN

  // Moderación administrativa: Previene spam o comentarios inapropiados antes de publicarse
  @Column({ default: false })
  isApproved: boolean;

  // Compra verificada: Marca si el usuario realmente compró el libro en la tienda
  @Column({ default: false })
  isVerifiedPurchase: boolean;

  // Contador de utilidad (Ej: "¿Te resultó útil esta reseña?")
  @Column({ type: 'int', default: 0 })
  helpfulVotes: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
