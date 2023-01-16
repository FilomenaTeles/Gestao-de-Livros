import { PaginatedList } from "../helpers/PaginatedList";
import { BookListDTO } from "../models/Books/BookListDTO";
import api from "./api";

export class BookService {
    async GetAll(
        currentPage: number,
        pageSize: number,
        sortingParameter: string|null,
        searchParameter: string|null
    ): Promise<PaginatedList<BookListDTO>> {
        try{
            var response = await api.post(
                'api/Books/getBooks',
                {
                    currentPage,
                    pageSize,
                    sortingParameter,
                    searchParameter
                }
            );
            return response.data;
        }
        catch(error){
            return new PaginatedList<BookListDTO>(
                false,
                "Erro ao obter os livros",
                "",
                [],
                0,
            )
        }
    }
}