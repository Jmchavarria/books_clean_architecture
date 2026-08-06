import { BookRepository } from 'src/app/books/domain/repositories/book.repository';
import Injectable from 'src/app/conmon/decorators/injectable';
import { VerifyBookExistsDto } from './verify-book-exists.dto';

@Injectable()
export class VerifyBookExistsUseCase {
  constructor(private readonly repository: BookRepository) {}

  async execute(input: VerifyBookExistsDto): Promise<boolean> {
    const result = await this.repository.verifyExists(input);

    return result;
  }
}
