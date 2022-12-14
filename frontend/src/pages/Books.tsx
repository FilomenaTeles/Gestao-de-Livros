import { AllBooks} from "../components/books/BooksList";
import { Search } from "../components/global/Search";

export function Books(){
    return(
        <div className="container">
            <Search/>
           <AllBooks/>
        </div>
    );
}