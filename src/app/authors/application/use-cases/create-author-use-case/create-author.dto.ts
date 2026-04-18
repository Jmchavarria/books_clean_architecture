export interface CreateAuthorDto {
    name: string
    lastname: string
    birthdate: Date
    biography?: string | null
    countryOfBirth: string
    literaryGenre?: string | null
    isActive: boolean
}
