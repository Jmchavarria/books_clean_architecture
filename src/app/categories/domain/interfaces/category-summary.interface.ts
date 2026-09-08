import type { StatusTypeEnum } from 'src/app/common/enums/status.type.enum';

export interface ICategorySummary {
  id: number;
  name: string;
  status: StatusTypeEnum;
  createdAt: Date;
  updatedAt: Date;
}
