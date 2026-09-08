import type { PaginationProps } from 'src/app/common/domain/pagination.props';

export interface CreateAuthorProps extends PaginationProps {
  firstName: string;
  lastName: string;
  slug: string;
  birthdate: Date;
  deathdate?: Date;
  biography?: string;
  countryOfBirth: string;
  photoUrl?: string;
  literaryGenre?: string;
}

export interface GetAllAuthorsProps {
  name?: string;
  isActive?: boolean;
  literaryGenre?: string;
}

export type UpdateAuthorsProps = Partial<CreateAuthorProps> & { id: number };
