export interface CreateAuthorDto {
  name: string;
  lastname: string;
  birthdate: Date;
  biography?: string;
  countryOfBirth: string;
  literaryGenre?: string;
  isActive: boolean;
}
