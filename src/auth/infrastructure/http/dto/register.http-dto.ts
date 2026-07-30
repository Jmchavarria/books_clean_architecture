import { OmitType } from '@nestjs/mapped-types';
import { IsString, MinLength } from 'class-validator';
import { CreateUserHttpDto } from 'src/app/users/infrastructure/http/dto/create-user.http-dto';

export class RegisterHttpDto extends OmitType(CreateUserHttpDto, ['role'] as const) {
  @IsString()
  @MinLength(6)
  confirmPassword: string;
}
