import type { UpdateOrderProps } from 'src/app/order/domain/entities/order-props';

export type UpdateOrderDto = UpdateOrderProps & { id: number };
