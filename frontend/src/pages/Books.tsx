import { Link } from "react-router-dom";
import { AllBooks} from "../components/books/BooksList";
import { SearchBook } from "../components/books/Search";

import {BiBookAdd} from "react-icons/bi";


export function Books(){
    return(
        <div className="container">
            
            <SearchBook/>
            <Link to='/addBook' className="btn"><BiBookAdd size={25}/> Novo livro</Link>
        
           <AllBooks/>
        </div>
    );
}