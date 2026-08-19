import type { IAuthorsSummary } from 'src/app/authors/domain/interfaces/authors-summary.interface';
import type { ICategorySummary } from 'src/app/categories/domain/interfaces/category-summary.interface';

export interface IBooksSumary {
  id: number;
  title: string;
  description: string;
  pages?: number;
  isActive: boolean;
  category: ICategorySummary;
  author: IAuthorsSummary;
  publishedYear?: number;
  createdAt: Date;
  updatedAt: Date;
}
