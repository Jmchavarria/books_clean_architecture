export interface IOrderItem {
  id: number;
  orderId: number;
  bookId: number;
  quantity: number;
  priceAtPurchase: number;
  totalPrice: number;
  createdAt: Date;
  updatedAt: Date;
}
