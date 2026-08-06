import type { PaginationProps } from 'src/app/conmon/domain/pagination.props';

export interface CreateAuthorProps extends PaginationProps {
  name: string;
  lastname: string;
  birthdate: Date;
  biography?: string;
  countryOfBirth: string;
  literaryGenre?: string;
  isActive: boolean;
}

export interface GetAllAuthorsProps {
  name?: string;
  isActive?: boolean;
  literaryGenre?: string;
}

export type UpdateAuthorsProps = Partial<CreateAuthorProps> & { id: number };
