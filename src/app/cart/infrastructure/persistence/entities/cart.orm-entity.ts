import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { UsersOrmEntity } from 'src/app/users/infrastructure/persistence/entities/users.orm-entity';
import { CartItemOrmEntity } from './cart-item.orm-entity';

@Entity('carts')
export class CartOrmEntity {
  @PrimaryGeneratedColumn()
  id: number;

  // Permite asociar el carrito a un usuario registrado
  @Column({ type: 'int', nullable: true })
  userId?: number;

  @OneToOne(() => UsersOrmEntity, (user) => user.cart, {
    nullable: true,
    onDelete: 'CASCADE', // Si se elimina el usuario, se elimina su carrito
  })
  @JoinColumn({ name: 'userId' })
  user?: UsersOrmEntity;

  // Para soportar carritos de usuarios no autenticados (invitados/invitadas)
  @Column({ type: 'varchar', length: 255, nullable: true })
  sessionToken?: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  // RELACIONES

  // Un carrito contiene múltiples ítems
  @OneToMany(() => CartItemOrmEntity, (item) => item.cart, {
    cascade: true, // Permite guardar o actualizar ítems automáticamente desde el carrito
  })
  items: CartItemOrmEntity[];
}
