import type { BooksDE } from 'src/app/books/domain/entities/book.domain-entity';

export class CategoryDE {
  constructor(
    public readonly id: number,
    public name: string,
    public isActive: boolean,
    public books: BooksDE[],
    public createdAt: Date,
    public updatedAt: Date,
  ) {}
}
