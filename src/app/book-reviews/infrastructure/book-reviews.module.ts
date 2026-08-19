import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BookReviewOrmEntity } from './persistence/entities/book-review.orm-entity';

Module({
  imports: [TypeOrmModule.forFeature([BookReviewOrmEntity])],
});
export class BookReviewsModule {}
