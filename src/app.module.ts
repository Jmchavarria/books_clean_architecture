import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BooksModule } from './app/books/infrastructure/books.module';
import { CategoryModule } from './app/categories/infrastructure/categories.module';
import { AuthorsModule } from './app/authors/infrastructure/authors.module';
import { AuthModule } from './app/auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from './app/users/infrastructure/users.module';
import 'dotenv/config';
import { CartModule } from './app/cart/infrastructure/cart.module';
import { GenresModule } from './app/genres/infrastructure/genres.module';
import { OrderModule } from './app/order/infrastructure/order.module';
import { BookReviewsModule } from './app/book-reviews/infrastructure/book-reviews.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: 'books',
      autoLoadEntities: true,
      synchronize: true,
    }),
    BooksModule,
    CategoryModule,
    AuthorsModule,
    AuthModule,
    UsersModule,
    CartModule,
    GenresModule,
    OrderModule,
    BookReviewsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
