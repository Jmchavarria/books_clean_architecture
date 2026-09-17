import Injectable from 'src/app/common/decorators/injectable';
import { CreateOrderDto } from './create-order.dto';
import { OrderDE } from 'src/app/order/domain/entities/order.domain-entity';
import { OrdersRepository } from 'src/app/order/domain/repositories/orders.repository';

@Injectable()
export class CreateOrderUseCase {
  constructor(private readonly repository: OrdersRepository) {}

  execute(input: CreateOrderDto): Promise<OrderDE> {
    return this.repository.create(input);
  }
}
