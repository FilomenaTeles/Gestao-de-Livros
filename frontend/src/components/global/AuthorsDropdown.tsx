import { useEffect, useState } from "react";
import Toast from "../../helpers/Toast";
import { AuthorListDTO } from "../../models/Authors/AuthorListDTO";
import { AuthorService } from "../../services/AuthorService";

export function AuthorsSelect(props:any){
    
    const authorService = new AuthorService;

    const [authors, setAuthors] = useState<AuthorListDTO[]>([]);

    useEffect(() => {
        getAuthor();
    }, []);

    const getAuthor = async () => {
        var response = await authorService.GetAll(1,1000,null,null)
        if(response.success !== true){
            Toast.Show("error",response.message)
        }
        setAuthors(response.items)
    }
    
    return(
        <select className="form-control m-3" name="authorId" id="authorId" onChange={props.onChange}>
                         <option disabled selected>Selecione um Autor</option>
                       {authors.map((author: AuthorListDTO) => (
                           <option value={author.id} >{author.name}</option>  
                       ))}
        </select>
    )
}