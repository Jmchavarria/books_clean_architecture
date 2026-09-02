import { Injectable } from '@nestjs/common';
import { UsersRepository } from 'src/app/users/domain/repository/users.repository';
import { GetUserByIdUseCase } from '../get-user-by-id/get-user-by-id.use-case';

@Injectable()
export class ChangePasswordUseCase {
  constructor(
    private readonly repository: UsersRepository,
    private readonly getUserByIdUseCase: GetUserByIdUseCase,
  ) {}

  async execute(id: number, newPassword: string): Promise<boolean> {
    await this.getUserByIdUseCase.execute(id);

    return this.repository.changePassword(id, newPassword);
  }
}
