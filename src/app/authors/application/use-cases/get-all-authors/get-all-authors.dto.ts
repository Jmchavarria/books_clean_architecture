import type { PaginationDto } from 'src/app/conmon/pagination-interface-dto/pagination.dto';

export interface FindAllAuthorsDto extends PaginationDto {
  name?: string;
  isActive?: boolean;
  literaryGenre?: string;
}
