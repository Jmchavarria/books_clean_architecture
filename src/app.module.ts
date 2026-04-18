import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BooksModule } from './app/books/infrastructure/books.module';
import { CategoryModule } from './app/categories/infrastructure/categories.module';
import { AuthorsModule } from './app/authors/infrastructure/authors.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'marlon3390',
      database: 'books',
      autoLoadEntities: true,
      synchronize: true,
    }),
    BooksModule,
    CategoryModule,
    AuthorsModule,


  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
