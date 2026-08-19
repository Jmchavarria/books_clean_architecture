// src/app/orders/domain/enums/order-status.enum.ts
export enum OrderStatusEnum {
  PENDING = 'PENDING', // Creado, pendiente de pago
  PAID = 'PAID', // Pago confirmado
  PROCESSING = 'PROCESSING', // En empaque / preparación
  SHIPPED = 'SHIPPED', // Entregado a la transportadora
  DELIVERED = 'DELIVERED', // Entregado al cliente
  CANCELLED = 'CANCELLED', // Cancelado
  REFUNDED = 'REFUNDED', // Reembolsado
}
