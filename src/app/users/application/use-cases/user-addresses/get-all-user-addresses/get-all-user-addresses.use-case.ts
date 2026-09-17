import { UserAddressRepository } from 'src/app/users/domain/repository/users-addresses.repositorty';
import { GetAllUserAddressesDto } from './get-all-user-addressess.dto';
import { Pagination } from 'src/app/common/pagination/pagination';
import { UserAddressesDE } from 'src/app/users/domain/entity/user-addresses.domain-entity';
import Injectable from 'src/app/common/decorators/injectable';

@Injectable()
export class GetAllUserAddressesUseCase {
  constructor(private readonly repository: UserAddressRepository) {}

  execute(input: GetAllUserAddressesDto): Promise<Pagination<UserAddressesDE[]>> {
    return this.repository.getAll(input);
  }
}
