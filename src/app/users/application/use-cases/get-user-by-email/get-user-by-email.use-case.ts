import Injectable from 'src/app/conmon/decorators/injectable';
import { UsersDE } from 'src/app/users/domain/entity/users.domain-enity';
import { UsersRepository } from 'src/app/users/domain/repository/users.repository';

@Injectable()
export class GetUserByEmailUseCase {
  constructor(private readonly repository: UsersRepository) {}

  async execute(email: string): Promise<UsersDE | null> {
    const result = await this.repository.getUserByEmail(email);

    return result;
  }
}
