import type { IAuthorsSummary } from 'src/app/authors/domain/interfaces/authors-summary.interface';
import type { ICategorySummary } from 'src/app/categories/domain/interfaces/category-summary.interface';

export class BooksDE {
  constructor(
    public id: number,
    public title: string,
    public authorId: number,
    public categoryId: number,
    public category: ICategorySummary,
    public description: string,
    public author: IAuthorsSummary,
    public pages: number,
    public isActive: boolean,
    public publishedYear: number,
    public createdAt: Date,
    public updatedAt: Date,
  ) {}
}
