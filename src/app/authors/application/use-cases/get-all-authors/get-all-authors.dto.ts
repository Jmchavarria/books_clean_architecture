import type { PaginationProps } from 'src/app/common/domain/pagination.props';

export interface GetAllAuthorsDto extends PaginationProps {
  name?: string;
  isActive?: boolean;
  literaryGenre?: string;
}
