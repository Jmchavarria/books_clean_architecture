export interface CreateUserAddressDto {
  userId: number;
  alias: string;
  streetAddress: string;
  apartmentOrSuite?: string;
  city: string;
  state: string;
  isDefault: boolean;
  postalCode: string;
  country: string;
}
