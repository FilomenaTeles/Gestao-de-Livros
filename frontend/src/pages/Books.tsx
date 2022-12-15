import { Link } from "react-router-dom";
import { AllBooks} from "../components/books/BooksList";
import { SearchBook } from "../components/books/Search";

import {BiBookAdd} from "react-icons/bi";


export function Books(){
    return(
        <div className="container">
            <h3 className="mt-3">Catálogo</h3>
            <div className="row">
                <div className="col-9">
                    <Link to='/addBook' className="btn"><BiBookAdd size={25}/> Novo livro</Link>
                </div>
                <div className="col-3"> <SearchBook/></div>
            </div>
        
           <AllBooks/>
        </div>
    );
}