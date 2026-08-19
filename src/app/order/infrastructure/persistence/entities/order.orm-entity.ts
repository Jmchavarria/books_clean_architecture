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
import { UsersOrmEntity } from 'src/app/users/infrastructure/persistence/entities/users.orm-entity';
import { OrderStatusEnum } from 'src/app/order/domain/enums/order-status.enum';
import { OrderItemOrmEntity } from './order-item.orm-entity';

@Entity('orders')
export class OrderOrmEntity {
  @PrimaryGeneratedColumn()
  id: number;

  // Número consecutivo legible para el cliente (Ej: ORD-2026-10023)
  @Column({ type: 'varchar', length: 50, unique: true })
  @Index('UQ_orders_order_number', { unique: true })
  orderNumber: string;

  // Relación con el Cliente
  @Column({ type: 'int' })
  userId: number;

  @ManyToOne(() => UsersOrmEntity, (user) => user.orders, {
    onDelete: 'RESTRICT', // No se debe permitir borrar un usuario si tiene compras históricas
  })
  @JoinColumn({ name: 'userId' })
  user: UsersOrmEntity;

  // Estado actual del Pedido
  @Column({
    type: 'enum',
    enum: OrderStatusEnum,
    default: OrderStatusEnum.PENDING,
  })
  status: OrderStatusEnum;

  // DESGLOSE FINANCIERO (Uso de 'decimal' para precisión exacta en dinero)
  @Column({ type: 'decimal', precision: 12, scale: 2 })
  subtotal: number;

  @Column({ type: 'decimal', precision: 12, scale: 2, default: 0 })
  shippingCost: number;

  @Column({ type: 'decimal', precision: 12, scale: 2, default: 0 })
  taxAmount: number;

  @Column({ type: 'decimal', precision: 12, scale: 2, default: 0 })
  discountAmount: number;

  @Column({ type: 'decimal', precision: 12, scale: 2 })
  totalAmount: number;

  // SNAPSHOT DE LA DIRECCIÓN DE ENVÍO
  // Guardamos un objeto JSON con la dirección exacta al momento de la compra
  // para proteger la información si el usuario modifica sus direcciones guardadas en el futuro.
  @Column({ type: 'json' })
  shippingAddressSnapshot: {
    alias?: string;
    streetAddress: string;
    apartmentOrSuite?: string;
    city: string;
    state: string;
    postalCode: string;
    country: string;
    recipientName?: string;
    recipientPhone?: string;
  };

  // Tracking de envío (Opcional)
  @Column({ type: 'varchar', length: 100, nullable: true })
  trackingNumber?: string;

  @Column({ type: 'varchar', length: 100, nullable: true })
  shippingCarrier?: string; // Ej: Servientrega, DHL, FedEx

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  // RELACIONES

  // Una orden contiene muchos ítems comprados
  @OneToMany(() => OrderItemOrmEntity, (item) => item.order, {
    cascade: true,
  })
  items: OrderItemOrmEntity[];
}
