export interface CreateBookDto {
  title: string;
  categoryId?: number;
  price: number;
  authorId: number;
  description?: string;
  pages: number;
  isActive: boolean;
  publishedYear: number;
}
