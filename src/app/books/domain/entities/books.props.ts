import type { PaginationProps } from 'src/app/conmon/domain/pagination.props';

export interface CreateBookProps {
  title: string;
  categoryId?: number;
  authorId: number;
  description?: string;
  pages: number;
  isActive: boolean;
  publishedYear: number;
}

export interface GetAllBooksProps extends PaginationProps {
  title?: string;
  isActive?: boolean;
  publishedYear?: number;
  search?: string;
}

export type UpdateBookProps = Partial<CreateBookProps> & { id: number };

export interface VerifyBookExistsProps {
  title: string;
  authorId: number;
  publishedYear: number;
}
