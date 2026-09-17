// src/app/order/presentation/dtos/update-order-http.dto.ts
import { IsEnum, IsOptional, IsString } from 'class-validator';
import { OrderStatusEnum } from 'src/app/order/domain/enums/order-status.enum';

export class UpdateOrderHttpDto {
  @IsOptional()
  @IsEnum(OrderStatusEnum)
  status?: OrderStatusEnum;

  @IsOptional()
  @IsString()
  trackingNumber?: string;

  @IsOptional()
  @IsString()
  shippingCarrier?: string;
}
