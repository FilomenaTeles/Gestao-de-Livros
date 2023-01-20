import { Link } from "react-router-dom";
import { AllBooks} from "../../components/books/BooksList";


import {BiBookAdd} from "react-icons/bi";


export function Books(){
    return(
        <div className="container">
            <Link to='/addBook' className="btn mt-5"><BiBookAdd size={25}/> Novo livro</Link>
            <AllBooks/>
        </div>
    );
}