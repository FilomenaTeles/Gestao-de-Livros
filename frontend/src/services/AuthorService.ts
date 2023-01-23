import { MessagingHelper } from "../helpers/MessagingHelper";
import { PaginatedList } from "../helpers/PaginatedList";
import { AuthorDTO } from "../models/Authors/AuthorDTO";
import { AuthorListDTO } from "../models/Authors/AuthorListDTO";
import { CreateAuthorDTO } from "../models/Authors/CreateAuthorDTO";
import { EditAuthorDTO } from "../models/Authors/EditAuthorDTO";
import { APIService } from "./APIService";

export class AuthorService{
    async GetAll(
        currentPage: number,
        pageSize: number,
        sortingParameter: string|null,
        searchParameter: string|null
    ): Promise<PaginatedList<AuthorListDTO>> {
        try{
            var response = await APIService.Axios().post(
                `${APIService.GetURL()}/Authors/getAll`,
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
            return new PaginatedList<AuthorListDTO>(
                false,
                "Erro ao obter os autores",
                "",
                [],
                0,
            )
        }
    }

    async Create(
        author:CreateAuthorDTO
        ): Promise<MessagingHelper<null>> {
            try{
                var response = await APIService.Axios().post(
                    `${APIService.GetURL()}/Authors/create`,
                    {...author}
                );
                return response.data;
                
            }catch(error){
                return new MessagingHelper(
                    false,
                    "Erro ao ligar ao servidor para criar novo autor",
                    null,
                )
            }
        }

    async Edit(
        author: EditAuthorDTO
        ): Promise<MessagingHelper<AuthorDTO | null>> {
            try{
                var response = await APIService.Axios().post(
                    `${APIService.GetURL()}/Authors/edit`,
                    {...author},
                );
                return response.data;
            } catch(error){
                return new MessagingHelper<AuthorDTO | null>(
                    false,
                    "Erro ao ligar ao servidor para editar autor",
                    null,
                )
            }
        }

    async Delete(
        deleteAuthor: AuthorDTO
    ): Promise<MessagingHelper<null>>{
        try{
            var response = await APIService.Axios().post(
                `${APIService.GetURL()}/Authors/delete`,
                deleteAuthor
            );
            return response.data;
        }catch(error){
            return new MessagingHelper(
                false,
                "Erro ao ligar ao servidor para eliminar autor.",
                null,
            )
        }
    }
}