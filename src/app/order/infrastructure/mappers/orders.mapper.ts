import { OrderDE } from '../../domain/entities/order.domain-entity';
import type { OrderOrmEntity } from '../persistence/entities/order.orm-entity';

export class OrdersMapper {
  static toDomain(entity: OrderOrmEntity): OrderDE {
    return new OrderDE({
      id: entity.id,
      orderNumber: entity.orderNumber,
      userId: entity.userId,
      user: entity.user,
      status: entity.status,
      subtotal: entity.subtotal,
      shippingCost: entity.shippingCost,
      taxAmount: entity.taxAmount,
      discountAmount: entity.discountAmount,
      totalAmount: entity.totalAmount,
      shippingAddressSnapshot: entity.shippingAddressSnapshot,
      trackingNumber: entity.trackingNumber,
      shippingCarrier: entity.shippingCarrier,
      createdAt: entity.createdAt,
      updatedAt: entity.updatedAt,
      items: entity.items,
    });
  }
}
