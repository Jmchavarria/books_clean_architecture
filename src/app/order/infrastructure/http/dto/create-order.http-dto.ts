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
}

export class CreateOrderHttpDto {
  @IsNotEmpty()
  @ValidateNested()
  @Type(() => ShippingAddressSnapshotDto)
  shippingAddressSnapshot: ShippingAddressSnapshotDto;

  @IsNotEmpty()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateOrderItemDto)
  items: CreateOrderItemDto[];
}
