import type { PaginationProps } from 'src/app/conmon/domain/pagination.props';

export interface GetAllCategoriesProps extends PaginationProps {
  pageQuery?: number;
  takeQuery?: number;
  name?: string;
  isActive?: boolean;
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
