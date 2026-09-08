import type { PaginationProps } from 'src/app/common/domain/pagination.props';

export interface GetAllBooksDto extends PaginationProps {
  title?: string;
  isActive?: boolean;
  publishedYear?: number;
  search?: string;
}
