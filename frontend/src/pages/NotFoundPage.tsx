import { Link } from "react-router-dom";
import image from "../assets/pageNotFound.png";


export function NotFoundPage(){
    return(
        <div className="container p-5 text-center">
            <img src={image} alt="" />
            <br />
            <h3>Page Not Found</h3>
            <br />
            <Link className="btn btn-secondary" to="/">Voltar à página principal </Link>
        </div>
    );
}