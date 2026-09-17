import { Body, Controller, Get, Param, Post, Put, Query } from '@nestjs/common';
import { CreateUserAddressUseCase } from '../../application/use-cases/user-addresses/create-user-address/create-user-address.use-case';
import { CreateUserAddressHttpDto } from './dto/user-addresses/create-user-addresses.http-dto';
import { GetUserAddressByIdUseCase } from '../../application/use-cases/user-addresses/get-user-address-by-id/get-user-address-by-id.use-case';
import { UpdateUserAddressUseCase } from '../../application/use-cases/user-addresses/update-user-address/update-user-address.use-case';
import { UpdateUserAddressHttDto } from './dto/user-addresses/udate-user-address.http-dto';
import { GetAllUserAddressesUseCase } from '../../application/use-cases/user-addresses/get-all-user-addresses/get-all-user-addresses.use-case';
import { GetAllUserAddressesHttpDto } from './dto/user-addresses/get-all-user-addresses.http-dto';

@Controller('user-addresses')
export class UserAddressesController {
  constructor(
    private readonly createUserAddressUseCase: CreateUserAddressUseCase,
    private readonly gtUserAddressByIdUseCase: GetUserAddressByIdUseCase,
    private readonly updateUserAddressUseCase: UpdateUserAddressUseCase,
    private readonly getAllUserAddressesUseCase: GetAllUserAddressesUseCase,
  ) {}

  @Get()
  async getAll(@Query() input: GetAllUserAddressesHttpDto) {
    return this.getAllUserAddressesUseCase.execute(input);
  }

  @Post()
  async create(@Body() input: CreateUserAddressHttpDto) {
    return this.createUserAddressUseCase.execute(input);
  }

  @Get(':id')
  async getById(@Param('id') id: number) {
    return this.gtUserAddressByIdUseCase.execute(id);
  }

  @Put(':id')
  async update(@Param('id') id: number, @Body() input: UpdateUserAddressHttDto) {
    return this.updateUserAddressUseCase.execute({ id, ...input });
  }
}
