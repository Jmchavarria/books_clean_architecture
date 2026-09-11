import type { ICategory } from '../interfaces/category.interface';
import type { StatusTypeEnum } from 'src/app/common/enums/status.type.enum';
import type { ItoCategoriesResponse } from 'src/app/books/domain/interfaces/books.interface';

export class CategoryDE {
  constructor(attributes: ICategory) {
    Object.assign(this, attributes);
  }

  public readonly id: number;
  public name: string;
  public slug: string;
  public description?: string;
  public status: StatusTypeEnum;
  public books: ItoCategoriesResponse[];
  public createdAt: Date;
  public updatedAt: Date;
}
