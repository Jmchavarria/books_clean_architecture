import type { PaginationProps } from 'src/app/common/domain/pagination.props';

export interface GetAllCategoriesProps extends PaginationProps {
  name?: string;
  isActive?: boolean;
  search?: string;
}

export interface CreateCategoryProps {
  name: string;
  slug: string;
  description: string;
}

export type UpdateCategoryProps = Partial<CreateCategoryProps> & { id: number };

export interface VerifyCategoryExistsProps {
  name: string;
}
