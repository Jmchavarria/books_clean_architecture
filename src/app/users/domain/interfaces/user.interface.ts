import type { BookReviewOrmEntity } from 'src/app/book-reviews/infrastructure/persistence/entities/book-review.orm-entity';
import type { CartOrmEntity } from 'src/app/cart/infrastructure/persistence/entities/cart.orm-entity';
import type { OrderOrmEntity } from 'src/app/order/infrastructure/persistence/entities/order.orm-entity';
import type { UserAddressOrmEntity } from '../../infrastructure/persistence/entities/users-address.orm-entity';
import type { UserRoleEnum } from '../enums/user-role.enum';
import type { UserStatusEnum } from '../enums/user-status.enum';

export interface IUser {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  password?: string;
  phone?: string;
  avatarUrl?: string;
  isEmailVerified: boolean;
  role: UserRoleEnum;
  status: UserStatusEnum;
  createdAt: Date;
  updatedAt: Date;

  //   cambiarlo por sus respectivas interfaces
  addresses: UserAddressOrmEntity[];
  orders: OrderOrmEntity[];
  cart?: CartOrmEntity;
  reviews: BookReviewOrmEntity[];
}
