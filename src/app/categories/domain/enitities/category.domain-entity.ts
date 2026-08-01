import type { IBooksSumary } from 'src/app/books/domain/interface/books-summary.interface';
import type { ICategory } from '../interfaces/category.interface';

export class CategoryDE {
  constructor(attributes: ICategory) {
    Object.assign(this, attributes);
  }

  public readonly id: number;
  public name: string;
  public isActive: boolean;
  public books: IBooksSumary[];
  public createdAt: Date;
  public updatedAt: Date;
}
