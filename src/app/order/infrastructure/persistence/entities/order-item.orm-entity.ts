import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { OrderOrmEntity } from './order.orm-entity';
import { BooksOrmEntity } from 'src/app/books/infrastructure/persistence/entities/books.orm-entity';

@Entity('order_items')
export class OrderItemOrmEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'int' })
  orderId: number;

  @ManyToOne(() => OrderOrmEntity, (order) => order.items, {
    onDelete: 'CASCADE', // Si por alguna razón administrativa se borra la orden, borra sus ítems
  })
  @JoinColumn({ name: 'orderId' })
  order: OrderOrmEntity;

  @Column({ type: 'int' })
  bookId: number;

  @ManyToOne(() => BooksOrmEntity, {
    onDelete: 'RESTRICT', // Evita borrar un libro si ya fue vendido en algún pedido
  })
  @JoinColumn({ name: 'bookId' })
  book: BooksOrmEntity;

  // Cantidad comprada
  @Column({ type: 'int' })
  quantity: number;

  // PRECIO HISTÓRICO AL MOMENTO DE COMPRA
  @Column({ type: 'decimal', precision: 12, scale: 2 })
  priceAtPurchase: number;

  // Subtotal de la línea (priceAtPurchase * quantity)
  @Column({ type: 'decimal', precision: 12, scale: 2 })
  totalPrice: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
