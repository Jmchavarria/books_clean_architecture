import { IsString, MaxLength, MinLength } from 'class-validator';

export class CreateCategoryHttpDto {
  @IsString()
  @MinLength(3)
  @MaxLength(60)
  name: string;

  @IsString()
  @MinLength(10)
  @MaxLength(155)
  description: string;
}
