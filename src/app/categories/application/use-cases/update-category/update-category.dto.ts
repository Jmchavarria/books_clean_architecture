import type { CreateCategoryDto } from '../../dto/create-category.dto';

export interface UpdateCategoryDto extends Partial<CreateCategoryDto> {
  id: number;
}
