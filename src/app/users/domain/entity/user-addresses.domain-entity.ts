import type { IUserAddresses } from '../interfaces/user-addresses.interface';

export class UserAddressesDE {
  public id: number;
  public userId: number;
  public alias: string;
  public streetAddress: string;
  public apartmentOrSuite?: string;
  public city: string;
  public state: string;
  public postalCode: string;
  public country: string;
  public isDefault: boolean;
  public createdAt: Date;
  public updatedAt: Date;

  public constructor(attributes: IUserAddresses) {
    Object.assign(this, attributes);
  }
}
