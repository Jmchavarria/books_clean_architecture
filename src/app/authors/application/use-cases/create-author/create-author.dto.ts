export interface CreateAuthorDto {
  firstName: string;
  lastName: string;
  birthdate: Date;
  deathdate?: Date;
  biography?: string;
  countryOfBirth: string;
  photoUrl?: string;
  literaryGenre?: string;
}
