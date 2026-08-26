import { PartialType } from '@nestjs/mapped-types';
import { CreateUserHttpDto } from './create-user.http-dto';

export class UpdateUserHttDto extends PartialType(CreateUserHttpDto) {}
