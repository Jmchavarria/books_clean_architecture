export interface CreateUserAddressProps {
  userId: number;
  alias: string;
  streetAddress: string;
  apartmentOrSuite?: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
}

export type UpdateUserAddressesProps = Partial<CreateUserAddressProps> & { id: number };
