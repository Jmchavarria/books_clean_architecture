import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { UsersOrmEntity } from '../../../../users/infrastructure/persistence/entities/users.orm-entity';

@Entity('refresh_tokens')
export class RefreshTokenOrmEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'int' })
  userId: number;

  @Column({ type: 'varchar', length: 255, unique: true })
  token: string;

  @Column({ type: 'datetime' })
  expiresAt: Date;

  @CreateDateColumn()
  createdAt: Date;

  @ManyToOne(() => UsersOrmEntity)
  @JoinColumn({ name: 'userId' })
  user: UsersOrmEntity;
}
