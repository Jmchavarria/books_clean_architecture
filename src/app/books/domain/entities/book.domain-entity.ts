export class BooksDE {
    constructor(
        public id: number,
        public title: string,
        public authorId: number,
        public categoryId: number,
        public description: string,
        public pages: number,
        public isActive: boolean,
        public publishedYear: number,
        public createdAt: Date,
        public updatedAt: Date,
    ) { }
}
