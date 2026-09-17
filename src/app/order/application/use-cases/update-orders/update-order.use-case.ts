import { CustomError } from 'src/app/common/errors/custom.error';
import { ErrorCode } from 'src/app/common/errors/error-code.enum';
import { OrderDE } from 'src/app/order/domain/entities/order.domain-entity';
import { OrdersRepository } from 'src/app/order/domain/repositories/orders.repository';
import { UpdateOrderDto } from './update-order.dto';
import Injectable from 'src/app/common/decorators/injectable';

@Injectable()
export class UpdateOrderUseCase {
  constructor(private readonly repository: OrdersRepository) {}

  async execute(input: UpdateOrderDto): Promise<OrderDE> {
    const existingOrder = await this.repository.getById(input.id);

    if (!existingOrder) {
      throw new CustomError({
        code: ErrorCode.register_not_found,
        message: `Order with ID ${input.id} not found`,
        statusCode: 404,
      });
    }

    const updatedOrder = await this.repository.update(input);

    if (!updatedOrder) {
      throw new CustomError({
        code: ErrorCode.internal_server_error,
        message: 'Failed to update order',
        statusCode: 500,
      });
    }

    return updatedOrder;
  }
}
