import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GenresOrmEntity } from './persistence/entities/genres.orm-entity';

@Module({
  imports: [TypeOrmModule.forFeature([GenresOrmEntity])],
  providers: [],
  exports: [],
})
export class GenresModule {}
