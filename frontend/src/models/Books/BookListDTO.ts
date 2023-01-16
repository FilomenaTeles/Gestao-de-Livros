export interface BookListDTO{
    id: number;
    isbn: number;
    name: string;
    authorId: number;
    price: string;
    image: string | null;
}