import { Injectable } from '@nestjs/common';
import { AuthorsRepository } from 'src/app/authors/domain/repository/authors.repository';
import { AuthorsDE } from 'src/app/authors/domain/entity/authors.domain-entity';
import { UpdateAuthorDto } from './update-author.dto';

@Injectable()
export class UpdateAuthorUseCase {
  constructor(private readonly repository: AuthorsRepository) {}

  async execute(input: UpdateAuthorDto): Promise<AuthorsDE> {
    const result = await this.repository.updateAuthor(input);
    return result;
  }
}
