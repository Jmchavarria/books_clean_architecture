import type { BookReviewOrmEntity } from 'src/app/book-reviews/infrastructure/persistence/entities/book-review.orm-entity';
import type { CartOrmEntity } from 'src/app/cart/infrastructure/persistence/entities/cart.orm-entity';
import type { OrderOrmEntity } from 'src/app/order/infrastructure/persistence/entities/order.orm-entity';
import type { UserAddressOrmEntity } from '../../infrastructure/persistence/entities/users-address.orm-entity';
import type { UserRoleEnum } from '../enums/user-role.enum';
import type { IUser } from '../interfaces/user.interface';

export class UsersDE {
  public id: number;
  public firstName: string;
  public lastname: string;
  public email: string;
  public password: string;
  public phone: string;
  public avatarUrl: string;
  public isEmailVerified: boolean;
  public role: UserRoleEnum;
  public status: string;
  public createdAt: Date;
  public updatedAt: Date;
  public addresses: UserAddressOrmEntity[];
  public orders: OrderOrmEntity[];
  public cart?: CartOrmEntity;
  public reviews?: BookReviewOrmEntity[];

  constructor(attributes: IUser) {
    Object.assign(this, attributes);
  }
}
