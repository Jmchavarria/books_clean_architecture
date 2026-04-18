import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AuthorsRepository } from "../domain/repository/authors.repository";
import { CreateAuthorUseCase } from "../application/use-cases/create-author-use-case/create-author.use-case";
import { FindAllAuthorsUseCase } from "../application/use-cases/find-all-authores-use-case/find-all-authores.use-case";
import { AuthorsController } from "./http/authors.controller";
import { AuthorsRepositoryImpl } from "./repositories/authors.repository.impl";
import { AuthorsOrmEntity } from "./persistence/entities/authors.orm-entity";

@Module({
  imports: [TypeOrmModule.forFeature([AuthorsOrmEntity])],
  controllers: [AuthorsController],
  providers: [
    {
      provide: AuthorsRepository,
      useClass: AuthorsRepositoryImpl,
    },
    FindAllAuthorsUseCase,
    CreateAuthorUseCase,
  ],
  exports: [AuthorsRepository],
})
export class AuthorsModule {}
