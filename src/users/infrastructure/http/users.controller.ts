import { Body, Controller, Post } from '@nestjs/common';
import { GetUserByEmailUseCase } from 'src/users/application/use-cases/get-user-by-username/get-user-by-username.use-case';
import { CreateUserHttpDto } from './dto/create-user.http-dto';
import { CreateUserUseCase } from 'src/users/application/use-cases/create-user/create-user.use-case';

@Controller('users')
export class UsersController {
  constructor(
    private readonly getUserByEmailUseCase: GetUserByEmailUseCase,
    private readonly createuserUseCase: CreateUserUseCase,
  ) {}

  @Post()
  createUser(@Body() input: CreateUserHttpDto) {
    return this.createuserUseCase.execute(input);
  }
}
