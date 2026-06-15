import type { CreateAuthorDto } from '../create-author/create-author.dto';

export interface UpdateAuthorDto extends Partial<CreateAuthorDto> {
  id: number;
}
