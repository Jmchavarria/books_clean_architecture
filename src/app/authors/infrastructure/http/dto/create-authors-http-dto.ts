import { Type } from 'class-transformer';
import { IsDate, IsOptional, IsString, IsUrl, Length, MaxDate, MinLength } from 'class-validator';

export class CreateAuthorHttpDto {
  @IsString()
  @Length(2, 50, { message: 'El nombre debe tener entre 2 y 50 caracteres' })
  firstName: string;

  @IsString()
  @Length(2, 50, { message: 'El apellido debe tener entre 2 y 50 caracteres' })
  lastName: string;

  @Type(() => Date)
  @IsDate()
  @MaxDate(new Date(), { message: 'La fecha de nacimiento no puede ser en el futuro' })
  birthdate: Date;

  @IsOptional()
  @IsString()
  @MinLength(10, { message: 'La biografía debe tener al menos 10 caracteres' })
  biography?: string;

  @IsString()
  @Length(3, 60, { message: 'El país debe tener entre 3 y 60 caracteres' })
  countryOfBirth: string;

  @IsOptional()
  @IsString()
  @Length(3, 30, { message: 'El género literario debe tener entre 3 y 30 caracteres' })
  literaryGenre?: string;

  @IsOptional()
  @IsString()
  @IsUrl({}, { message: 'La foto debe ser una URL válida (ej. https://...)' })
  photoUrl?: string;
}
