import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BooksModule } from './app/books/infrastructure/books.module';
import { CategoryModule } from './app/categories/infrastructure/categories.module';
import { AuthorsModule } from './app/authors/infrastructure/authors.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
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
    AuthModule,
    UsersModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
