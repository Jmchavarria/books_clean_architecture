import type { OrderStatusEnum } from '../../enums/order-status.enum';

export interface IShippingAddressSnapshotDto {
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

export interface ICreateOrderItemDto {
  bookId: number;
  quantity: number;
  priceAtPurchase: number;
}

export interface ICreateOrderDto {
  orderNumber: string;
  userId: number;
  status?: OrderStatusEnum;
  subtotal: number;
  shippingCost: number;
  taxAmount: number;
  discountAmount: number;
  totalAmount: number;
  shippingAddressSnapshot: IShippingAddressSnapshotDto;
  trackingNumber?: string;
  shippingCarrier?: string;
  items: ICreateOrderItemDto[];
}
