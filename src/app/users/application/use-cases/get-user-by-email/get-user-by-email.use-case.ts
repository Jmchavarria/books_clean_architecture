import Injectable from 'src/app/common/decorators/injectable';
import { UsersDE } from 'src/app/users/domain/entity/users.domain-enity';
import { UsersRepository } from 'src/app/users/domain/repository/users.repository';

@Injectable()
export class GetUserExistsUseCase {
  constructor(private readonly repository: UsersRepository) {}

  async execute(email?: string, phone?: string): Promise<UsersDE | null> {
    const result = await this.repository.getUserExists(email, phone);

    return result;
  }
}
