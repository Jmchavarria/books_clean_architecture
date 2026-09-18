import type { IAuthorsSummary } from 'src/app/authors/domain/interfaces/authors-summary.interface';
import type { StatusTypeEnum } from 'src/app/common/enums/status.type.enum';
import type { BookFormatEnum } from '../enums/book-format.enum';
import type { ICategorySummary } from 'src/app/categories/domain/interfaces/category.interface';

export interface IBooks {
  id: number;
  title: string;
  description: string;
  language: string;
  format: BookFormatEnum;
  pages?: number;
  price: number;
  status: StatusTypeEnum;
  publishedYear?: number;
  author: IAuthorsSummary;
  category: ICategorySummary;
  createdAt: Date;
  updatedAt: Date;
}
export type ItoAuthorsResponse = Omit<IBooks, 'author' | 'createdAt' | 'updatedAt'>;
export type ItoCategoriesResponse = Omit<IBooks, 'category'>;
