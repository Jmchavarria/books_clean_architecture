import type { ItoCategoriesResponse } from 'src/app/books/domain/interfaces/books.interface';
import type { StatusTypeEnum } from 'src/app/common/enums/status.type.enum';

export interface ICategory {
  id: number;
  name: string;
  slug: string;
  description?: string;
  status: StatusTypeEnum;
  books: ItoCategoriesResponse[];
  createdAt: Date;
  updatedAt: Date;
}

export type toBooksresponse = Omit<ICategory, 'books'>;

export interface ICategorySummary {
  id: number;
  name: string;
  status: StatusTypeEnum;
  createdAt: Date;
  updatedAt: Date;
}
