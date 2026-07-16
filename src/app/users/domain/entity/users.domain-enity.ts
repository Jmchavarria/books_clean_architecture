import type { UserRoleEnum } from '../enums/user-role.enum';

export class UsersDE {
  constructor(
    public id: number,
    public name: string,
    public lastname: string,
    public email: string,
    public password: string,
    public role: UserRoleEnum,
    public status: string,
    public createdAt: Date,
    public updatedAt: Date,
  ) {}
}
