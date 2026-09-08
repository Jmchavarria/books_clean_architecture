import type { IBooksSumary } from 'src/app/books/domain/interfaces/books-summary.interface';
import type { StatusTypeEnum } from 'src/app/common/enums/status.type.enum';

export interface ICategory {
  id: number;
  name: string;
  slug: string;
  description?: string;
  status: StatusTypeEnum;
  books: IBooksSumary[];
  createdAt: Date;
  updatedAt: Date;
}
