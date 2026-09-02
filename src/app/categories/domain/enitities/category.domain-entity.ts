import type { IBooksSumary } from 'src/app/books/domain/interfaces/books-summary.interface';
import type { ICategory } from '../interfaces/category.interface';
import type { StatusTypeEnum } from 'src/app/conmon/enums/status.type.enum';

export class CategoryDE {
  constructor(attributes: ICategory) {
    Object.assign(this, attributes);
  }

  public readonly id: number;
  public name: string;
  public slug: string;
  public description?: string;
  public status: StatusTypeEnum;
  public books: IBooksSumary[];
  public createdAt: Date;
  public updatedAt: Date;
}
