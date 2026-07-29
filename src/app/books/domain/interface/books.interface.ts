import type { IAuthorsSummary } from 'src/app/authors/domain/interfaces/authors-summary.interface';
import type { ICategorySummary } from 'src/app/categories/domain/interfaces/category-summary.interface';

export interface IBooks {
  id: number;
  title: string;
  authorId: number;
  categoryId: number;
  category: ICategorySummary;
  description: string;
  author: IAuthorsSummary;
  pages: number;
  isActive: boolean;
  publishedYear: number;
  createdAt: Date;
  updatedAt: Date;
}
