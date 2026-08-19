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
import { CartOrmEntity } from './cart.orm-entity';
import { BooksOrmEntity } from 'src/app/books/infrastructure/persistence/entities/books.orm-entity';

@Entity('cart_items')
// Asegura que un libro no se repita en múltiples filas para el mismo carrito
@Index('UQ_cart_items_cart_book', ['cartId', 'bookId'], { unique: true })
export class CartItemOrmEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'int' })
  cartId: number;

  @ManyToOne(() => CartOrmEntity, (cart) => cart.items, {
    onDelete: 'CASCADE', // Si se vacía/elimina el carrito, se borran sus ítems
  })
  @JoinColumn({ name: 'cartId' })
  cart: CartOrmEntity;

  @Column({ type: 'int' })
  bookId: number;

  @ManyToOne(() => BooksOrmEntity)
  @JoinColumn({ name: 'bookId' })
  book: BooksOrmEntity;

  @Column({ type: 'int', default: 1 })
  quantity: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
