import { OmitType } from '@nestjs/mapped-types';
import { CreateUserHttpDto } from 'src/app/users/infrastructure/http/dto/create-user.http-dto';

export class RegisterHttpDto extends OmitType(CreateUserHttpDto, ['role'] as const) {}
