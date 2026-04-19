export class BooksDE {
    constructor(
        public id: string,
        public title: string,
        public authorId: string,
        public categoryId: string,
        public description: string,
        public pages: number,
        public isActive: boolean,
        public publishedYear: number,
        public createdAt: Date,
        public updatedAt: Date,
    ) { }
}
