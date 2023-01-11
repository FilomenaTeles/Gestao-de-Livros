import { Link } from "react-router-dom";
import {AiOutlineUserAdd} from "react-icons/ai"
import { AuthorList } from "../components/authors/AuthorList";

export function Author(){
    return (
        <div className="container">
            
        <Link to='/addauthor' className="btn mt-5"><AiOutlineUserAdd size={25}/> Novo Autor</Link>
       <AuthorList/>

    </div>
    )
}