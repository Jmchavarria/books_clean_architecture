import { IsString, MaxLength, MinLength } from 'class-validator';

export class ChangePasswordHttpDto {
  @IsString()
  @MinLength(6)
  @MaxLength(15)
  password: string;
}
