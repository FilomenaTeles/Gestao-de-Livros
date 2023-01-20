import { MessagingHelper } from "../helpers/MessagingHelper";
import { PaginatedList } from "../helpers/PaginatedList";
import { BookDTO } from "../models/Books/BookDTO";
import { BookListDTO } from "../models/Books/BookListDTO";
import { CreateBookDTO } from "../models/Books/CreateBookDTO";
import { EditBookDTO } from "../models/Books/EditBookDTO";
import { APIService } from "./APIService";

export class BookService {
    async GetAll(
        currentPage: number,
        pageSize: number,
        sortingParameter: string|null,
        searchParameter: string|null
    ): Promise<PaginatedList<BookListDTO>> {
        try{
            var response = await APIService.Axios().post(
                `${APIService.GetURL()}/Books/getBooks`,
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

    async GetById(
        bookId:number
    ):Promise<MessagingHelper<CreateBookDTO | null>>{
        try{
            var response = await APIService.Axios().get(
                `${APIService.GetURL()}/Books/${bookId}`,
            );
            return response.data;

        }catch(error){
            return new MessagingHelper<CreateBookDTO | null>(
                false,
                "Erro ao ligar ao servidor para encontrar livro",
                null,
            )
        }
    }

    async Update(
        book: EditBookDTO
        ): Promise<MessagingHelper<BookDTO | null>> {
            try{
                var response = await APIService.Axios().post(
                    `${APIService.GetURL()}/Books/update`,
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

    async Create(
        book:CreateBookDTO
        ): Promise<MessagingHelper<null>> {
            try{
                var response = await APIService.Axios().post(
                    `${APIService.GetURL()}/Books/create`,
                    {...book}
                );
                return response.data;
                
            }catch(error){
                return new MessagingHelper(
                    false,
                    "Erro ao ligar ao servidor para criar novo livro",
                    null,
                )
            }
        }

    async Delete(
        deleteBook: BookDTO
    ): Promise<MessagingHelper<null>>{
        try{
            var response = await APIService.Axios().post(
                `${APIService.GetURL()}/Books/delete`,
                deleteBook
            );
            return response.data;
        }catch(error){
            return new MessagingHelper(
                false,
                "Erro ao ligar ao servidor para eliminar livro: "+error,
                null,
            )
        }
    }
}