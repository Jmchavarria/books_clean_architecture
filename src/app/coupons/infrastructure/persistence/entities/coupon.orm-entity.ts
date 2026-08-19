import { DiscountTypeEnum } from 'src/app/coupons/domain/enums/discount-types.enum';
import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('coupons')
export class CouponOrmEntity {
  @PrimaryGeneratedColumn()
  id: number;

  // Código que el usuario ingresa en la tienda (ej. "LEER2026", "DESCUENTO10")
  @Column({ type: 'varchar', length: 50, unique: true })
  @Index('UQ_coupons_code', { unique: true })
  code: string;

  @Column({ type: 'text', nullable: true })
  description?: string;

  // Tipo de descuento: Porcentaje o Monto Fijo
  @Column({
    type: 'enum',
    enum: DiscountTypeEnum,
    default: DiscountTypeEnum.PERCENTAGE,
  })
  discountType: DiscountTypeEnum;

  // Valor del descuento (ej: 15 si es 15%, o 5000 si es $5000 de descuento)
  @Column({ type: 'decimal', precision: 12, scale: 2 })
  discountValue: number;

  // Monto mínimo de compra en el carrito para que el cupón sea aplicable
  @Column({ type: 'decimal', precision: 12, scale: 2, default: 0 })
  minPurchaseAmount: number;

  // Monto máximo de descuento permitido (útil si es un porcentaje, ej. 20% con tope de $30.00)
  @Column({ type: 'decimal', precision: 12, scale: 2, nullable: true })
  maxDiscountAmount?: number;

  // VIGENCIA Y LÍMITES DE USO

  @Column({ type: 'timestamp' })
  validFrom: Date;

  @Column({ type: 'timestamp' })
  validUntil: Date;

  // Cantidad máxima de veces que el cupón puede ser usado globalmente (null = ilimitado)
  @Column({ type: 'int', nullable: true })
  maxUses?: number;

  // Contador de veces que ha sido canjeado exitosamente
  @Column({ type: 'int', default: 0 })
  usedCount: number;

  // Máximo de usos permitidos por un mismo usuario (por defecto 1 uso por cliente)
  @Column({ type: 'int', default: 1 })
  maxUsesPerUser: number;

  @Column({ default: true })
  isActive: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
