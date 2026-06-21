import { UsersDE } from 'src/app/users/domain/entity/users.domain-enity';
import { UsersRepository } from 'src/app/users/domain/repository/users.repository';
import { CreateUserDto } from './create-user.dto';
import Injectable from 'src/app/conmon/decorators/injectable';

@Injectable()
export class CreateUserUseCase {
  constructor(private readonly repository: UsersRepository) {}

  async execute(input: CreateUserDto): Promise<UsersDE> {
    const result = await this.repository.createUser(input);

    return result;
  }
}
