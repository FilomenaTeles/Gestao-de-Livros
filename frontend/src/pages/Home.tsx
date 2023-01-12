import { Link } from "react-router-dom";
import "./home.css"
import test from '../assets/books.png';

export function Home(){
    return(
        <div className="container text-center p-5 ">
            <h1>Catálogo de Livros</h1>
            <Link to={'/books'}>
            <img src={test} alt="book shelf" className="img p-4"/>
            </Link> 
        </div>
    );
}