import { UsersRepository } from 'src/users/domain/repository/users.repository';
import { CreateUserDto } from './create-user.dto';
import { UsersDE } from 'src/users/domain/entity/users.domain-enity';
import Injectable from 'src/app/conmon/decorators/injectable';

@Injectable()
export class CreateUserUseCase {
  constructor(private readonly repository: UsersRepository) {}

  async execute(input: CreateUserDto): Promise<UsersDE> {
    const result = await this.repository.createUser(input);

    return result;
  }
}
