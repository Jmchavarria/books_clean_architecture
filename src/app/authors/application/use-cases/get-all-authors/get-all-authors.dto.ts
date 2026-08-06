import type { PaginationProps } from 'src/app/conmon/domain/pagination.props';

export interface GetAllAuthorsDto extends PaginationProps {
  name?: string;
  isActive?: boolean;
  literaryGenre?: string;
}
