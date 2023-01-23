import { useEffect, useState } from "react";
import Toast from "../../helpers/Toast";
import { AuthorDTO } from "../../models/Authors/AuthorDTO";
import { AuthorListDTO } from "../../models/Authors/AuthorListDTO";
import { AuthorService } from "../../services/AuthorService";

export function AuthorsSelect(props:any){
    
    const authorService = new AuthorService;
    var authorSelect:AuthorDTO = new AuthorDTO;
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

    {props.authorId != null?(
        authorSelect.id=props.authorId
    ):(
        authorSelect.id = 0
    )}
    
    return(
        <select className="form-control form-select " name="authorId" id="authorId" onChange={props.onChange}>
           <option disabled selected>Selecione um Autor</option>
            {authors.map((author: AuthorListDTO) => (
                authorSelect.id == author.id ?(
                    <option value={author.id} selected>{author.name}</option>  
                ):(
                    <option value={author.id} >{author.name}</option>  
                )
            
                
                
            ))}
        </select>
    )
}