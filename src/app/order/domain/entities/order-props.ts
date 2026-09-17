import type { PaginationProps } from 'src/app/common/domain/pagination.props';
import type { IOrderItem } from '../interfaces/order-item.interface';
import type { IOrder } from '../interfaces/order.interface';
import type { OrderStatusEnum } from '../enums/order-status.enum';

export type CreateOrderProps = Omit<
  IOrder,
  'id' | 'createdAt' | 'updatedAt' | 'items' | 'status' | 'user'
> & {
  items: Omit<IOrderItem, 'id' | 'orderId' | 'totalPrice' | 'createdAt' | 'updatedAt'>[];
};

export interface GetAllOrdersProps extends PaginationProps {
  search?: string;
  status?: string;
  userId?: number;
}

export interface UpdateOrderProps {
  id: number;
  status?: OrderStatusEnum;
  trackingNumber?: string;
  shippingCarrier?: string;
}
