import { PartialType } from '@nestjs/mapped-types';
import { CreateCategoryHttpDto } from './create-category-http-dto';

export class UpdateCategoryHttpDto extends PartialType(CreateCategoryHttpDto) {}
