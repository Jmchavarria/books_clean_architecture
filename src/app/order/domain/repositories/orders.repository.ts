import type { OrderDE } from '../entities/order.domain-entity';
import type {
  CreateOrderProps,
  GetAllOrdersProps,
  UpdateOrderProps,
} from '../entities/order-props';
import type { Pagination } from 'src/app/common/pagination/pagination';

export abstract class OrdersRepository {
  abstract getAll(filters?: GetAllOrdersProps): Promise<Pagination<OrderDE[]>>;
  abstract create(input: CreateOrderProps): Promise<OrderDE>;
  abstract update(input: UpdateOrderProps): Promise<OrderDE | null>;
  abstract getById(id: number): Promise<OrderDE | null>;
}
