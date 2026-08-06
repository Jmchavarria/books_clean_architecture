import type { PaginationProps } from 'src/app/conmon/domain/pagination.props';

export interface GetAllCategoriesDto extends PaginationProps {
  name?: string;
  isActive?: boolean;
}
