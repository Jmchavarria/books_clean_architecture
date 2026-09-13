import { PartialType } from '@nestjs/mapped-types';
import { CreateUserAddressHttpDto } from './create-user-addresses.http-dto';

export class UpdateUserAddressHttDto extends PartialType(CreateUserAddressHttpDto) {}
