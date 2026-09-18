import type { IAuthorsSummary } from 'src/app/authors/domain/interfaces/authors-summary.interface';
import type { IBooks } from '../interfaces/books.interface';
import type { StatusTypeEnum } from 'src/app/common/enums/status.type.enum';
import type { BookFormatEnum } from '../enums/book-format.enum';
import type { ICategorySummary } from 'src/app/categories/domain/interfaces/category.interface';

export class BooksDE {
  public id: number;
  public title: string;
  public description: string;
  public language: string;
  public format: BookFormatEnum;
  public pages?: number;
  public price: number;
  public status: StatusTypeEnum;
  public publishedYear: number;
  public author: IAuthorsSummary;
  public category: ICategorySummary;
  public createdAt: Date;
  public updatedAt: Date;

  constructor(attributes: IBooks) {
    Object.assign(this, attributes);
  }
}
