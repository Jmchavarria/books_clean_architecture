export interface CreateBookDto {
    title: string
    categoryId?: string | null
    authorId: string
    description?: string | null
    pages: number
    isActive: boolean
    publishedYear: number
}
