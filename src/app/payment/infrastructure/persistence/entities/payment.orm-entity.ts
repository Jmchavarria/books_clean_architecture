import { OrderOrmEntity } from 'src/app/order/infrastructure/persistence/entities/order.orm-entity';
import { PaymentStatusEnum } from 'src/app/payment/domain/enums/payment-status.enum';
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

@Entity('payments')
export class PaymentOrmEntity {
  @PrimaryGeneratedColumn()
  id: number;

  // Relación ManyToOne o OneToOne con la Orden
  @Column({ type: 'int' })
  orderId: number;

  @ManyToOne(() => OrderOrmEntity, {
    onDelete: 'RESTRICT', // No se debe borrar un registro de pago si la orden existe
  })
  @JoinColumn({ name: 'orderId' })
  order: OrderOrmEntity;

  // Nombre del proveedor del pago (Ej: 'STRIPE', 'MERCADOPAGO', 'PAYPAL')
  @Column({ type: 'varchar', length: 50 })
  paymentProvider: string;

  // ID único devuelto por la pasarela de pago (ej: "ch_3Mv123456789" en Stripe)
  @Column({ type: 'varchar', length: 255, nullable: true })
  @Index('UQ_payments_provider_transaction', { unique: true })
  transactionId?: string;

  // Método de pago específico (Ej: 'CREDIT_CARD', 'DEBIT_CARD', 'PSE', 'PAYPAL_ACCOUNT')
  @Column({ type: 'varchar', length: 50, nullable: true })
  paymentMethod?: string;

  // Monto real procesado en este pago
  @Column({ type: 'decimal', precision: 12, scale: 2 })
  amount: number;

  // Moneda de la transacción (Ej: 'USD', 'COP', 'EUR')
  @Column({ type: 'varchar', length: 3, default: 'COP' })
  currency: string;

  // Estado del Pago
  @Column({
    type: 'enum',
    enum: PaymentStatusEnum,
    default: PaymentStatusEnum.PENDING,
  })
  status: PaymentStatusEnum;

  // Objeto JSON para guardar toda la respuesta/payload crudo entregado por el webhook de la pasarela
  @Column({ type: 'json', nullable: true })
  rawResponse?: Record<string, any>;

  @Column({ type: 'timestamp', nullable: true })
  paidAt?: Date;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
