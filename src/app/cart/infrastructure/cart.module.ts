import { TypeOrmModule } from '@nestjs/typeorm';
import { CartOrmEntity } from './persistence/entities/cart.orm-entity';
import { Module } from '@nestjs/common';
import { CartItemOrmEntity } from './persistence/entities/cart-item.orm-entity';

@Module({
  imports: [TypeOrmModule.forFeature([CartOrmEntity, CartItemOrmEntity])],
})
export class CartModule {}
