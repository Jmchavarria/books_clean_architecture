import { Body, Controller, Post } from '@nestjs/common';
import { CreateUserHttpDto } from './dto/create-user.http-dto';
import { CreateUserUseCase } from '../../application/use-cases/create-user/create-user.use-case';

@Controller('users')
export class UsersController {
  constructor(private readonly createuserUseCase: CreateUserUseCase) {}

  @Post()
  createUser(@Body() input: CreateUserHttpDto) {
    return this.createuserUseCase.execute(input);
  }
}
