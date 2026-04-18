export class BooksDE {
    constructor(
        public id: string,
        public title: string,
        public authorId: string,
        public categoryId: string | null,
        public description: string | null,
        public pages: number,
        public isActive: boolean,
        public publishedYear: number,
        public createdAt: Date,
        public updatedAt: Date,
    ) { }
}
