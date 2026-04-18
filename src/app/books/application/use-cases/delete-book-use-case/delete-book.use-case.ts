import { Injectable } from '@nestjs/common';

import { BookRepository } from "src/app/books/domain/repositories/book.repository";

@Injectable()
export class DeleteBookUseCase {
    constructor(
        private readonly Bookrepository: BookRepository) { }

    async execute(id: string) {
        await this.Bookrepository.delete(id)
    }
}