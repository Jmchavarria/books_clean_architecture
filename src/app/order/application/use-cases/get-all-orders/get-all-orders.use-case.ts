import { Pagination } from 'src/app/common/pagination/pagination';
import { OrderDE } from 'src/app/order/domain/entities/order.domain-entity';
import { OrdersRepository } from 'src/app/order/domain/repositories/orders.repository';
import { GetAllOrdersDto } from './get-all-orders.dto';
import Injectable from 'src/app/common/decorators/injectable';

@Injectable()
export class GetAllOrdersUseCase {
  constructor(private readonly repository: OrdersRepository) {}

  execute(filters: GetAllOrdersDto): Promise<Pagination<OrderDE[]>> {
    return this.repository.getAll(filters);
  }
}
