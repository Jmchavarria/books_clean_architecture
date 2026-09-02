import { Body, Controller, Get, Param, ParseIntPipe, Patch, Post, Query } from '@nestjs/common';
import { CreateUserHttpDto } from './dto/create-user.http-dto';
import { CreateUserUseCase } from '../../application/use-cases/create-user/create-user.use-case';
import { GetUserByIdUseCase } from '../../application/use-cases/get-user-by-id/get-user-by-id.use-case';
import { GetAllUsersUseCase } from '../../application/use-cases/get-all-users/get-all-users.use-case';
import { GetAllUsersHttpDto } from './dto/get-all-users.http-dto';
import { UpdateUserUseCase } from '../../application/use-cases/update-user/update-user.use-case';
import { UpdateUserHttDto } from './dto/update-user.http-dto';
import { ChangePasswordHttpDto } from './dto/change-password.http-dto';
import { ChangePasswordUseCase } from '../../application/use-cases/change-password/change-password.use-case';

@Controller('users')
export class UsersController {
  constructor(
    private readonly createuserUseCase: CreateUserUseCase,
    private readonly getUserByIdUseCase: GetUserByIdUseCase,
    private readonly getAllUsersUseCase: GetAllUsersUseCase,
    private readonly updateUserUseCase: UpdateUserUseCase,
    private readonly changePasswordUseCase: ChangePasswordUseCase,
  ) {}

  @Get()
  getAlL(@Query() input: GetAllUsersHttpDto) {
    return this.getAllUsersUseCase.execute(input);
  }

  @Post()
  create(@Body() input: CreateUserHttpDto) {
    return this.createuserUseCase.execute(input);
  }

  @Get('/:idUser')
  getUserById(@Param() idUser: number) {
    return this.getUserByIdUseCase.execute(idUser);
  }

  @Patch('change-password/:id')
  changePassword(@Param('id') id: number, @Body() input: ChangePasswordHttpDto) {
    return this.changePasswordUseCase.execute(id, input.password);
  }

  @Patch('/:id')
  update(@Param('id', ParseIntPipe) id: number, @Body() input: UpdateUserHttDto) {
    return this.updateUserUseCase.execute({
      id,
      ...input,
    });
  }
}
