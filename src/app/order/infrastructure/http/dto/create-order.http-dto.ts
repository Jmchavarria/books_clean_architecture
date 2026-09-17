import {
  IsString,
  IsNumber,
  IsOptional,
  IsNotEmpty,
  IsArray,
  ValidateNested,
  Min,
  IsPositive,
} from 'class-validator';
import { Type } from 'class-transformer';
import { CreateOrderDto } from 'src/app/order/application/use-cases/create-orders/create-order.dto';

export class ShippingAddressSnapshotDto {
  @IsOptional()
  @IsString()
  alias?: string;

  @IsNotEmpty()
  @IsString()
  streetAddress: string;

  @IsOptional()
  @IsString()
  apartmentOrSuite?: string;

  @IsNotEmpty()
  @IsString()
  city: string;

  @IsNotEmpty()
  @IsString()
  state: string;

  @IsNotEmpty()
  @IsString()
  postalCode: string;

  @IsNotEmpty()
  @IsString()
  country: string;

  @IsOptional()
  @IsString()
  recipientName?: string;

  @IsOptional()
  @IsString()
  recipientPhone?: string;
}

export class CreateOrderItemDto {
  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  bookId: number;

  @IsNotEmpty()
  @IsNumber()
  @Min(1)
  quantity: number;

  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  priceAtPurchase: number;

  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  totalPrice: number;
}

export class CreateOrderHttpDto implements CreateOrderDto {
  @IsNotEmpty()
  @IsString()
  orderNumber: string;

  @IsNotEmpty()
  @IsNumber()
  userId: number;

  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  subtotal: number;

  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  shippingCost: number;

  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  taxAmount: number;

  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  discountAmount: number;

  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  totalAmount: number;

  @IsNotEmpty()
  @ValidateNested()
  @Type(() => ShippingAddressSnapshotDto)
  shippingAddressSnapshot: ShippingAddressSnapshotDto;

  @IsOptional()
  @IsString()
  trackingNumber?: string;

  @IsOptional()
  @IsString()
  shippingCarrier?: string;

  @IsNotEmpty()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateOrderItemDto)
  items: CreateOrderItemDto[];
}
