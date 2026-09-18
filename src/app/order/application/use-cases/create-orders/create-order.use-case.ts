import Injectable from 'src/app/common/decorators/injectable';
import { CreateOrderDto } from './create-order.dto';
import { OrderDE } from 'src/app/order/domain/entities/order.domain-entity';
import { OrdersRepository } from 'src/app/order/domain/repositories/orders.repository';
import { GetBookByIdUseCase } from 'src/app/books/application/use-cases/get-book-by-id-use-case/get-book-by-id.use-case';
import { CreateOrderItemProps } from 'src/app/order/domain/entities/order-props';

@Injectable()
export class CreateOrderUseCase {
  constructor(
    private readonly repository: OrdersRepository,
    private readonly getBookByIdUseCase: GetBookByIdUseCase,
  ) {}

  async execute(input: CreateOrderDto): Promise<OrderDE> {
    const preparedItems: CreateOrderItemProps[] = [];
    let subtotal = 0;

    for (const item of input.items) {
      const book = await this.getBookByIdUseCase.execute(item.bookId);
      const priceAtPurchase = book.price;
      const totalPrice = priceAtPurchase * item.quantity;

      subtotal += totalPrice;

      preparedItems.push({
        priceAtPurchase,
        totalPrice,
        quantity: item.quantity,
        bookId: book.id,
      });
    }

    const shippingCost = subtotal >= 50 ? 0 : 5.0;
    const taxAmount = 0;
    const discountAmount = 0;
    const totalAmount = subtotal + shippingCost + taxAmount - discountAmount;

    const generatedOrderNumber = `ORD-${Date.now()}-${Math.floor(1000 + Math.random() * 9000)}`;
    return this.repository.create({
      orderNumber: generatedOrderNumber,
      discountAmount,
      totalAmount,
      subtotal,
      shippingAddressSnapshot: input.shippingAddressSnapshot,
      shippingCost,
      taxAmount,
      userId: input.userId,
      items: preparedItems,
    });
  }
}
