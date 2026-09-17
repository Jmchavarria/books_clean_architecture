import { InjectRepository } from '@nestjs/typeorm';
import { OrdersRepository } from 'src/app/order/domain/repositories/orders.repository';
import { Repository } from 'typeorm';
import { OrderOrmEntity } from '../persistence/entities/order.orm-entity';
import {
  CreateOrderProps,
  GetAllOrdersProps,
  UpdateOrderProps,
} from 'src/app/order/domain/entities/order-props';
import { OrderDE } from 'src/app/order/domain/entities/order.domain-entity';
import { OrdersMapper } from '../mappers/orders.mapper';
import { Pagination } from 'src/app/common/pagination/pagination';
import Injectable from 'src/app/common/decorators/injectable';

@Injectable()
export class OrdersRepositoryImpl implements OrdersRepository {
  constructor(
    @InjectRepository(OrderOrmEntity)
    private readonly repository: Repository<OrderOrmEntity>,
  ) {}

  async create(input: CreateOrderProps): Promise<OrderDE> {
    const savedData = await this.repository.save(input);

    return OrdersMapper.toDomain(savedData);
  }

  async getAll(filters: GetAllOrdersProps): Promise<Pagination<OrderDE[]>> {
    const { search, status, userId, pageQuery = 1, takeQuery = 5 } = filters;

    const query = this.repository
      .createQueryBuilder('orders')
      .leftJoinAndSelect('orders.user', 'user')
      .leftJoinAndSelect('orders.items', 'items')
      .leftJoinAndSelect('items.book', 'book');

    for (const [field, value] of Object.entries({ status, userId })) {
      if (value !== undefined) {
        query.andWhere(`orders.${field} = :${field}`, { [field]: value });
      }
    }

    const skip = (pageQuery - 1) * takeQuery;

    if (search?.trim()) {
      query.andWhere(
        `(
          orders.orderNumber ILIKE :search OR
          orders.trackingNumber ILIKE :search OR
          user.email ILIKE :search OR
          CONCAT_WS(' ', user.firstName, user.lastName) ILIKE :search
        )`,
        {
          search: `%${search}%`,
        },
      );
    }

    const data = await query
      .orderBy('orders.createdAt', 'DESC')
      .skip(skip)
      .take(takeQuery)
      .getMany();

    const count = await query.getCount();

    return new Pagination(
      data.map((entity) => OrdersMapper.toDomain(entity)),
      count,
      pageQuery,
      takeQuery,
    );
  }

  async update(input: UpdateOrderProps): Promise<OrderDE | null> {
    await this.repository.update(input.id, { ...input });

    const existsUser = await this.repository.findOneBy({ id: input.id });

    return existsUser !== null ? OrdersMapper.toDomain(existsUser) : null;
  }

  async getById(id: number): Promise<OrderDE | null> {
    const order = await this.repository.findOne({
      where: { id },
      relations: ['user', 'items', 'items.book'],
    });

    return order !== null ? OrdersMapper.toDomain(order) : null;
  }
}
