export interface IUserAddresses {
  id: number;
  userId: number;
  alias: string;
  streetAddress: string;
  apartmentOrSuite?: string;
  city: string;
  state: string;
  postalCode: string;
  isDefault: boolean;
  country: string;
  createdAt: Date;
  updatedAt: Date;
}
