import { CartOrmEntity } from 'src/app/cart/infrastructure/persistence/entities/cart.orm-entity';
import { UserRoleEnum } from 'src/app/users/domain/enums/user-role.enum';
import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { UserAddressOrmEntity } from './users-address.orm-entity';
import { OrderOrmEntity } from 'src/app/order/infrastructure/persistence/entities/order.orm-entity';
import { BookReviewOrmEntity } from 'src/app/book-reviews/infrastructure/persistence/entities/book-review.orm-entity';
import { StatusTypeEnum } from 'src/app/common/enums/status.type.enum';
@Entity('users')
export class UsersOrmEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 100 })
  firstName: string;

  @Column({ type: 'varchar', length: 100 })
  lastName: string;

  @Column({ type: 'varchar', length: 150, unique: true })
  @Index('UQ_users_email', { unique: true })
  email: string;

  // En TypeORM no es recomendable retornar el password por defecto en queries de lectura
  @Column({ type: 'varchar', length: 255, select: false })
  password?: string;

  @Column({ type: 'varchar', length: 20, nullable: true })
  phone?: string;

  @Column({ type: 'varchar', length: 500, nullable: true })
  avatarUrl?: string;

  @Column({ default: false })
  isEmailVerified: boolean;

  @Column({
    type: 'enum',
    enum: UserRoleEnum,
    default: UserRoleEnum.USER,
  })
  role: UserRoleEnum;

  @Column({
    type: 'enum',
    enum: StatusTypeEnum,
    default: StatusTypeEnum.ACTIVE,
  })
  status: StatusTypeEnum;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  // RELACIONES

  // Un usuario puede tener múltiples direcciones (Casa, Trabajo, etc.)
  @OneToMany(() => UserAddressOrmEntity, (address) => address.user)
  addresses: UserAddressOrmEntity[];

  // Un usuario realiza muchos pedidos
  @OneToMany(() => OrderOrmEntity, (order) => order.user)
  orders: OrderOrmEntity[];

  // Un usuario tiene un carrito activo
  @OneToOne(() => CartOrmEntity, (cart) => cart.user)
  cart?: CartOrmEntity;

  // Un usuario puede escribir varias opiniones/reseñas sobre libros
  @OneToMany(() => BookReviewOrmEntity, (review) => review.user)
  reviews: BookReviewOrmEntity[];
}
