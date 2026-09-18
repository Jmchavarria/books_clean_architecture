import type { PaginationProps } from 'src/app/common/domain/pagination.props';
import type { OrderStatusEnum } from '../enums/order-status.enum';
import type { ShippingAddressSnapshot } from '../interfaces/order.interface';

export interface CreateOrderItemProps {
  bookId: number;
  quantity: number;
  priceAtPurchase: number;
  totalPrice: number;
}

export interface CreateOrderProps {
  orderNumber: string;
  userId: number;
  subtotal: number;
  shippingCost: number;
  taxAmount: number;
  discountAmount: number;
  totalAmount: number;
  shippingAddressSnapshot: ShippingAddressSnapshot;
  items: CreateOrderItemProps[];
}

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
