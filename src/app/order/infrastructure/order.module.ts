import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderOrmEntity } from './persistence/entities/order.orm-entity';
import { OrderItemOrmEntity } from './persistence/entities/order-item.orm-entity';
import { CreateOrderUseCase } from '../application/use-cases/create-orders/create-order.use-case';
import { OrdersRepository } from '../domain/repositories/orders.repository';
import { OrdersRepositoryImpl } from './repositories/orders.repository-impl';
import { OrderController } from 'src/app/order/infrastructure/http/orders.controller';
import { GetAllOrdersUseCase } from '../application/use-cases/get-all-orders/get-all-orders.use-case';
import { UpdateOrderUseCase } from '../application/use-cases/update-orders/update-order.use-case';
import { GetOrderByIdUseCase } from '../application/use-cases/get-order-by-id/get-order-by-id.use-case';

@Module({
  imports: [TypeOrmModule.forFeature([OrderOrmEntity, OrderItemOrmEntity])],
  providers: [
    CreateOrderUseCase,
    GetAllOrdersUseCase,
    UpdateOrderUseCase,
    GetOrderByIdUseCase,
    {
      provide: OrdersRepository,
      useClass: OrdersRepositoryImpl,
    },
  ],
  controllers: [OrderController],
  exports: [],
})
export class OrderModule {}
