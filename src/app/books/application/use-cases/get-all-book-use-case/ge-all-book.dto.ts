import type { PaginationProps } from 'src/app/conmon/domain/pagination.props';

export interface GetAllBooksDto extends PaginationProps {
  title?: string;
  isActive?: boolean;
  publishedYear?: number;
  search?: string;
}
