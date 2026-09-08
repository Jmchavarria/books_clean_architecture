import { BookRepository } from 'src/app/books/domain/repositories/book.repository';
import { VerifyBookExistsDto } from './verify-book-exists.dto';
import Injectable from 'src/app/common/decorators/injectable';

@Injectable()
export class VerifyBookExistsUseCase {
  constructor(private readonly repository: BookRepository) {}

  async execute(input: VerifyBookExistsDto): Promise<boolean> {
    const result = await this.repository.verifyExists(input);

    return result;
  }
}
