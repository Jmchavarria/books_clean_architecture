import { UsersRepository } from 'src/app/users/domain/repository/users.repository';
import type { GetAllUsersDto } from './get-all-users.dto';
import Injectable from 'src/app/common/decorators/injectable';

@Injectable()
export class GetAllUsersUseCase {
  constructor(private readonly repository: UsersRepository) {}

  async execute(filters: GetAllUsersDto) {
    return this.repository.getAll(filters);
  }
}
