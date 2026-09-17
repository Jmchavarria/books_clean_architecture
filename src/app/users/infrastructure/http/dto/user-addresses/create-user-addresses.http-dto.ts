import { IsNumber, IsString, IsNotEmpty, IsOptional, IsBoolean } from 'class-validator';

export class CreateUserAddressHttpDto {
  @IsNumber()
  @IsNotEmpty()
  userId: number;

  @IsString()
  @IsNotEmpty()
  alias: string;

  @IsString()
  @IsNotEmpty()
  streetAddress: string;

  @IsString()
  @IsOptional() // Al ser opcional en tu interfaz (?), usamos IsOptional
  apartmentOrSuite?: string;

  @IsString()
  @IsNotEmpty()
  city: string;

  @IsString()
  @IsNotEmpty()
  state: string;

  @IsString()
  @IsNotEmpty()
  postalCode: string;

  @IsBoolean()
  @IsNotEmpty()
  isDefault: boolean;

  @IsString()
  @IsNotEmpty()
  country: string;
}
