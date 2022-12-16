import { Link } from "react-router-dom";
import { AllBooks} from "../components/books/BooksList";


import {BiBookAdd} from "react-icons/bi";


export function Books(){
    return(
        <div className="container">
            <h3 className="mt-3">Catálogo</h3>
           
            <Link to='/addBook' className="btn"><BiBookAdd size={25}/> Novo livro</Link>
          
           <AllBooks/>
           
        </div>
    );
}