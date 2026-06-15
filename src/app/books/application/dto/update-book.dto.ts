import type { CreateBookDto } from '../use-cases/create-book-use-case/create-book.dto';

export interface UpdateBookDto extends Partial<CreateBookDto> {
  id: number;
}
