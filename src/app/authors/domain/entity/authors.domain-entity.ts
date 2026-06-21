import type { IBooksSumary } from 'src/app/books/domain/interface/books-summary.interface';

export class AuthorsDE {
  constructor(
    public id: number,
    public name: string,
    public lastname: string,
    public birthdate: Date,
    public biography: string,
    public countryOfBirth: string,
    public literaryGenre: string,
    public isActive: boolean,
    public createdAt: Date,
    public updatedAt: Date,
    public books: IBooksSumary[],
  ) {}
}
