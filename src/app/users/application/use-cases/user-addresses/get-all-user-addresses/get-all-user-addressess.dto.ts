import type { PaginationProps } from 'src/app/common/domain/pagination.props';

export interface GetAllUserAddressesDto extends PaginationProps {
  userId: number;
  search: string;
}
