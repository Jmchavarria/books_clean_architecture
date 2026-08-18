import type { CreateUserDto } from 'src/app/users/application/use-cases/create-user/create-user.dto';

export type RegisterDto = Omit<CreateUserDto, 'role'>;
