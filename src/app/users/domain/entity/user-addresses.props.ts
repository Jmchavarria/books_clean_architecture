import type { PaginationProps } from 'src/app/common/domain/pagination.props';

export interface CreateUserAddressProps {
  userId: number;
  alias: string;
  streetAddress: string;
  apartmentOrSuite?: string;
  city: string;
  isDefault: boolean;
  state: string;
  postalCode: string;
  country: string;
}

export type UpdateUserAddressesProps = Partial<CreateUserAddressProps> & { id: number };

export interface GetAllUserAddressesProps extends PaginationProps {
  userId: number;
  search: string;
}
