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
import { WishlistOrmEntity } from './wish-list.orm-entity';

@Entity('wishlist_items')
// Previene que el mismo libro se guarde dos veces en la misma lista
@Index('UQ_wishlist_items_wishlist_book', ['wishlistId', 'bookId'], { unique: true })
export class WishlistItemOrmEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'int' })
  wishlistId: number;

  @ManyToOne(() => WishlistOrmEntity, (wishlist) => wishlist.items, {
    onDelete: 'CASCADE', // Si se elimina la lista, se borran sus ítems
  })
  @JoinColumn({ name: 'wishlistId' })
  wishlist: WishlistOrmEntity;

  @Column({ type: 'int' })
  bookId: number;

  @ManyToOne(() => BooksOrmEntity, {
    onDelete: 'CASCADE', // Si un libro deja de existir en el catálogo, se remueve de las listas
  })
  @JoinColumn({ name: 'bookId' })
  book: BooksOrmEntity;

  @CreateDateColumn()
  addedAt: Date; // Fecha en la que el usuario agregó el libro a la lista

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
