// src/app/payments/domain/enums/payment-status.enum.ts
export enum PaymentStatusEnum {
  PENDING = 'PENDING', // Transacción iniciada / esperando confirmación
  SUCCESS = 'SUCCESS', // Pago aprobado correctamente
  FAILED = 'FAILED', // Transacción rechazada o fallida
  REFUNDED = 'REFUNDED', // Reembolsado al cliente
}
