import { Body, Controller, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { CreateOrderUseCase } from 'src/app/order/application/use-cases/create-orders/create-order.use-case';
import { GetAllOrdersUseCase } from 'src/app/order/application/use-cases/get-all-orders/get-all-orders.use-case';
import { GetAllUsersHttpDto } from 'src/app/users/infrastructure/http/dto/get-all-users.http-dto';
import { UpdateOrderUseCase } from 'src/app/order/application/use-cases/update-orders/update-order.use-case';
import { CreateOrderHttpDto } from './dto/create-order.http-dto';
import { UpdateOrderHttpDto } from './dto/update-order.http-dto';
import { GetOrderByIdUseCase } from '../../application/use-cases/get-order-by-id/get-order-by-id.use-case';

@Controller('orders')
export class OrderController {
  constructor(
    private readonly createOrderUseCase: CreateOrderUseCase,
    private readonly getAllOrdersUseCase: GetAllOrdersUseCase,
    private readonly updateOrderUseCase: UpdateOrderUseCase,
    private readonly getOrderByIdUseCase: GetOrderByIdUseCase,
  ) {}

  @Get()
  async getAll(@Query() input: GetAllUsersHttpDto) {
    return this.getAllOrdersUseCase.execute(input);
  }

  @Post()
  async create(@Body() input: CreateOrderHttpDto) {
    return this.createOrderUseCase.execute(input);
  }

  @Get(':id')
  async getById(@Param('id') id: number) {
    return this.getOrderByIdUseCase.execute(id);
  }

  @Patch(':id')
  async update(@Param('id') id: number, @Body() input: UpdateOrderHttpDto) {
    return this.updateOrderUseCase.execute({ id, ...input });
  }
}
