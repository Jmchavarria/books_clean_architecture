export interface UpdateBookDto {
    id: string
    title: string
    categoryId: string
    authorId: string
    description: string
    pages: number
    isActive: boolean
    publishedYear: number
}
