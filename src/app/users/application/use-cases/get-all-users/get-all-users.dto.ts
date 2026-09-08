import type { PaginationProps } from 'src/app/common/domain/pagination.props';
import type { StatusTypeEnum } from 'src/app/common/enums/status.type.enum';

export interface GetAllUsersDto extends PaginationProps {
  status?: StatusTypeEnum;
  search?: string;
}
