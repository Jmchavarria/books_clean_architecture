import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { UsersOrmEntity } from './users.orm-entity';

@Entity('user_addresses')
export class UserAddressOrmEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'int' })
  userId: number;

  @ManyToOne(() => UsersOrmEntity, (user) => user.addresses, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'userId' })
  user: UsersOrmEntity;

  @Column({ type: 'varchar', length: 100 })
  alias: string; // Ej: "Casa", "Oficina"

  @Column({ type: 'varchar', length: 200 })
  streetAddress: string; // Dirección completa

  @Column({ type: 'varchar', length: 100, nullable: true })
  apartmentOrSuite?: string;

  @Column({ type: 'varchar', length: 100 })
  city: string;

  @Column({ type: 'varchar', length: 100 })
  state: string;

  @Column({ type: 'varchar', length: 20 })
  postalCode: string;

  @Column({ type: 'varchar', length: 100, default: 'Colombia' })
  country: string;

  @Column({ default: false })
  isDefault: boolean; // Indica si es la dirección predeterminada de envío

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
