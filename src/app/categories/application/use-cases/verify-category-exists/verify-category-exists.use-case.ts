import { Injectable } from '@nestjs/common';
import { CategoryRepository } from 'src/app/categories/domain/repositories/category.reposiroty';
import { VerifyCategoryExistsDto } from './verify-category-exists.dto';

@Injectable()
export class VerifyCategoryExistsUseCase {
  constructor(private readonly repository: CategoryRepository) {}

  async execute({ name }: VerifyCategoryExistsDto): Promise<boolean> {
    const result = await this.repository.verifyExists({ name });

    return result;
  }
}
