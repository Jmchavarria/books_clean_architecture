import type { PaginationProps } from 'src/app/common/domain/pagination.props';

export interface GetAllCategoriesDto extends PaginationProps {
  name?: string;
  isActive?: boolean;
  search?: string;
}
