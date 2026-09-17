import Injectable from 'src/app/common/decorators/injectable';
import { CustomError } from 'src/app/common/errors/custom.error';
import { ErrorCode } from 'src/app/common/errors/error-code.enum';
import { OrderDE } from 'src/app/order/domain/entities/order.domain-entity';
import { OrdersRepository } from 'src/app/order/domain/repositories/orders.repository';

@Injectable()
export class GetOrderByIdUseCase {
  constructor(private readonly repository: OrdersRepository) {}

  async execute(id: number): Promise<OrderDE> {
    const order = await this.repository.getById(id);

    if (!order) {
      throw new CustomError({
        code: ErrorCode.register_not_found,
        message: `Order with ID ${id} not found`,
        statusCode: 404,
      });
    }

    return order;
  }
}
