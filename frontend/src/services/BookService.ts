import { MessagingHelper } from "../helpers/MessagingHelper";
import { PaginatedList } from "../helpers/PaginatedList";
import { BookDTO } from "../models/Books/BookDTO";
import { BookListDTO } from "../models/Books/BookListDTO";
import { EditBookDTO } from "../models/Books/EditBookDTO";
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

    async Update(
        book: EditBookDTO
        ): Promise<MessagingHelper<BookDTO | null>> {
            try{
                var response = await api.post(
                    "api/Books/update",
                    {...book},
                );
                return response.data;
            } catch(error){
                return new MessagingHelper<BookDTO | null>(
                    false,
                    "Erro ao ligar ao servidor para editar livro",
                    null,
                )
            }
        }
}