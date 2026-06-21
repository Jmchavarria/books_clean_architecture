import type { IBooksSumary } from 'src/app/books/domain/interface/books-summary.interface';

export class CategoryDE {
  constructor(
    public readonly id: number,
    public name: string,
    public isActive: boolean,
    public books: IBooksSumary[],
    public createdAt: Date,
    public updatedAt: Date,
  ) {}
}
