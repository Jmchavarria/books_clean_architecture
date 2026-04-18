import { BooksDE } from "src/app/books/domain/entities/book.entity";
import { BookOrmEntity } from "../persistence/entities/book.orm-entity";

export class BookMapper {
  static toDomain(entity: BookOrmEntity): BooksDE {
    return new BooksDE(
      entity.id,
      entity.title,
      entity.authorId,
      entity.categoryId ?? null,
      entity.description ?? null,
      entity.pages,
      entity.isActive,
      entity.publishedYear,
      entity.createdAt,
      entity.updatedAt,
    );
  }
}
