import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  Query,
  UploadedFile,
  // UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { CreateBookUseCase } from '../../application/use-cases/create-book-use-case/create-book-use-case';
import { GetAllBooksUseCase } from '../../application/use-cases/get-all-book-use-case/get-all-book.use-case';
import { GetBookByIdUseCase } from '../../application/use-cases/get-book-by-id-use-case/get-book-by-id.use-case';
import { CreateBookHttpDto } from './dto/create-book.http-dto';
import { GetAllBooksHttpDto } from './dto/get-all-books.dto';
import { UpdateBookUseCase } from '../../application/use-cases/update-book-use-case/update-book.use-case';
import { UpdateBookHttpDto } from './dto/update-book.http-dto';
// import { JwtAuthGuard } from 'src/auth/infrastructure/guards/jwt-auth.guard';
import { Roles } from 'src/app/auth/decorators/roles.decorator';
import { FileInterceptor } from '@nestjs/platform-express';
import { UploadBookCoverUseCase } from '../../application/use-cases/upload-book-cover/upload-book-cover.use-case';

@Controller('books')
export class BooksController {
  constructor(
    private readonly createBook: CreateBookUseCase,
    private readonly getAllBooksUseCase: GetAllBooksUseCase,
    private readonly getBookById: GetBookByIdUseCase,
    private readonly updateBookUseCase: UpdateBookUseCase,
    private readonly uploadBookCoverUseCase: UploadBookCoverUseCase,
  ) {}

  // @UseGuards(JwtAuthGuard)

  @Roles('admin')
  @Get()
  getAll(@Query() filters: GetAllBooksHttpDto) {
    return this.getAllBooksUseCase.execute(filters);
  }

  @Post()
  create(@Body() input: CreateBookHttpDto) {
    return this.createBook.execute(input);
  }

  @Get(':id')
  getById(@Param('id') id: number) {
    return this.getBookById.execute(id);
  }

  @Post('upload-book-cover')
  @UseInterceptors(FileInterceptor('file'))
  uploadBookCover(@UploadedFile() file: Express.Multer.File) {
    return this.uploadBookCoverUseCase.execute({ file });
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() input: UpdateBookHttpDto) {
    return this.updateBookUseCase.execute({ id, ...input });
  }
}
