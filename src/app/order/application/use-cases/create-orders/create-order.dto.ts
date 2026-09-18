import type { ShippingAddressSnapshot } from 'src/app/order/domain/interfaces/order.interface';

export interface CreateOrderItemDto {
  bookId: number;
  quantity: number;
}

export interface CreateOrderDto {
  userId: number;
  shippingAddressSnapshot: ShippingAddressSnapshot;
  items: CreateOrderItemDto[];
}
