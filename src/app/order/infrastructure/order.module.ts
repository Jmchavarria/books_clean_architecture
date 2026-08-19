import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderOrmEntity } from './persistence/entities/order.orm-entity';
import { OrderItemOrmEntity } from './persistence/entities/order-item.orm-entity';

@Module({
  imports: [TypeOrmModule.forFeature([OrderOrmEntity, OrderItemOrmEntity])],
  providers: [],
  exports: [],
})
export class OrderModule {}
