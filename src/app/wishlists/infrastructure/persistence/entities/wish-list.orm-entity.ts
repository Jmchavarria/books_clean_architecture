import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { UsersOrmEntity } from 'src/app/users/infrastructure/persistence/entities/users.orm-entity';
import { WishlistItemOrmEntity } from './wish-list-item.orm-entity';

@Entity('wishlists')
export class WishlistOrmEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'int' })
  userId: number;

  @ManyToOne(() => UsersOrmEntity, {
    onDelete: 'CASCADE', // Si se elimina el usuario, se eliminan sus listas
  })
  @JoinColumn({ name: 'userId' })
  user: UsersOrmEntity;

  // Nombre de la lista (ej. "Favoritos", "Para leer en vacaciones")
  @Column({ type: 'varchar', length: 100, default: 'Favoritos' })
  name: string;

  // Permite saber si es la lista principal predeterminada del usuario
  @Column({ default: true })
  isMain: boolean;

  // Indica si la lista es pública (se puede compartir por link) o privada
  @Column({ default: false })
  isPublic: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  // RELACIONES

  @OneToMany(() => WishlistItemOrmEntity, (item) => item.wishlist, {
    cascade: true,
  })
  items: WishlistItemOrmEntity[];
}
