import { PartialType } from '@nestjs/mapped-types';
import { CreateAuthorHttpDto } from './create-authors-http-dto';

export class UpdateAuthorHttpDto extends PartialType(CreateAuthorHttpDto) {}
