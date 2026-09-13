import { UserAddressRepository } from 'src/app/users/domain/repository/users-addresses.repositorty';
import type { CreateUserAddressDto } from './create-user-address.dto';
import Injectable from 'src/app/common/decorators/injectable';

@Injectable()
export class CreateUserAddressUseCase {
  constructor(private readonly repository: UserAddressRepository) {}

  execute(input: CreateUserAddressDto) {
    return this.repository.create(input);
  }
}
