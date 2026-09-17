import type { UsersDE } from 'src/app/users/domain/entity/users.domain-enity';
import type { OrderStatusEnum } from '../enums/order-status.enum';
import type { IOrder } from '../interfaces/order.interface';
import type { OrderItemDE } from './order-item/order-item.domain-enity';

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

export class OrderDE {
  id: number;
  orderNumber: string;
  userId: number;
  user: UsersDE;
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
  items: OrderItemDE[];

  constructor(attributes: IOrder) {
    Object.assign(this, attributes);
  }
}
