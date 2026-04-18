export class AuthorsDE {
    constructor(
        public id: string,
        public name: string,
        public lastname: string,
        public birthdate: Date,
        public biography: string | null,
        public countryOfBirth: string,
        public literaryGenre: string | null,
        public isActive: boolean,
        public createdAt: Date,
        public updatedAt: Date,
        public books: string[] = []
    ) { }
}
