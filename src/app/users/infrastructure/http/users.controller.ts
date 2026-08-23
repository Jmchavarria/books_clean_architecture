import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CreateUserHttpDto } from './dto/create-user.http-dto';
import { CreateUserUseCase } from '../../application/use-cases/create-user/create-user.use-case';
import { GetUserByIdUseCase } from '../../application/use-cases/get-user-by-id/get-user-by-id.use-case';
import { GetUserByEmailUseCase } from '../../application/use-cases/get-user-by-email/get-user-by-email.use-case';

@Controller('users')
export class UsersController {
  constructor(
    private readonly createuserUseCase: CreateUserUseCase,
    private readonly getUserByIdUseCase: GetUserByIdUseCase,
    private readonly getUserByEmailUseCase: GetUserByEmailUseCase,
  ) {}

  @Post()
  createUser(@Body() input: CreateUserHttpDto) {
    return this.createuserUseCase.execute(input);
  }

  @Get('/:idUser')
  getUserById(@Param() idUser: number) {
    return this.getUserByIdUseCase.execute(idUser);
  }
}
