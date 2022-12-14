import { AllBooks} from "../components/books/BooksList";
import { SearchBook } from "../components/books/Search";

export function Books(){
    return(
        <div className="container">
            <SearchBook/>
           <AllBooks/>
        </div>
    );
}