import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthorsRepository } from '../domain/repository/authors.repository';
import { CreateAuthorUseCase } from '../application/use-cases/create-author/create-author.use-case';
import { GetAllAuthorsUseCase } from '../application/use-cases/get-all-authors/get-all-authors.use-case';
import { AuthorsController } from './http/authors.controller';
import { AuthorsRepositoryImpl } from './repositories/authors.repository.impl';
import { AuthorsOrmEntity } from './persistence/entities/authors.orm-entity';
import { GetAuthorByidUseCase } from '../application/use-cases/get-author-by-id/get-author-by-id.use-case';
import { UpdateAuthorUseCase } from '../application/use-cases/update-author/update-author.use-case';

@Module({
  imports: [TypeOrmModule.forFeature([AuthorsOrmEntity])],
  controllers: [AuthorsController],
  providers: [
    {
      provide: AuthorsRepository,
      useClass: AuthorsRepositoryImpl,
    },
    GetAllAuthorsUseCase,
    CreateAuthorUseCase,
    GetAuthorByidUseCase,
    UpdateAuthorUseCase,
  ],
  exports: [AuthorsRepository],
})
export class AuthorsModule {}
