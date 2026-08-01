import type { IBooksSumary } from 'src/app/books/domain/interface/books-summary.interface';

export interface ICategory {
  id: number;
  name: string;
  isActive: boolean;
  books: IBooksSumary[];
  createdAt: Date;
  updatedAt: Date;
}
