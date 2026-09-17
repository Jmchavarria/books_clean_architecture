import type { IOrderItem } from '../../interfaces/order-item.interface';

export class OrderItemDE {
  id: number;
  orderId: number;
  bookId: number;
  quantity: number;
  priceAtPurchase: number;
  totalPrice: number;
  createdAt: Date;
  updatedAt: Date;

  constructor(attributes: IOrderItem) {
    Object.assign(this, attributes);
  }
}
