import type { OrderStatusEnum } from 'src/app/order/domain/enums/order-status.enum';
import type { IOrderItem } from './order-item.interface';
import type { IUser } from 'src/app/users/domain/interfaces/user.interface';

export interface ShippingAddressSnapshot {
  alias?: string;
  streetAddress: string;
  apartmentOrSuite?: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
  recipientName?: string;
  recipientPhone?: string;
}

export interface IOrder {
  id: number;
  orderNumber: string;
  userId: number;
  user: IUser;
  status: OrderStatusEnum;
  subtotal: number;
  shippingCost: number;
  taxAmount: number;
  discountAmount: number;
  totalAmount: number;
  shippingAddressSnapshot: ShippingAddressSnapshot;
  trackingNumber?: string;
  shippingCarrier?: string;
  createdAt: Date;
  updatedAt: Date;
  items?: IOrderItem[];
}
