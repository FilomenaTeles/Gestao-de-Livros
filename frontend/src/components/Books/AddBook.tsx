import api from "../../services/api";
import "./styles.css"

import {BsBook} from "react-icons/bs";
import { Link } from "react-router-dom";


export function AddBook(){
    return(
        <div className="add-book-container">
           <div className="container p-3 mt-5">
            <h3 className="text-center"><BsBook size={55}/> Adicionar novo Livro</h3>
            <div className="container row">
                <div className="container col-6">
                    <form>
                        <input className="input-group m-3" type="text" placeholder="Nome"/>
                        <input className="input-group m-3"  type="text" placeholder="Autor" />
                        <input className="input-group m-3"  type="number" placeholder="ISBN"/>
                        <input className="input-group m-3"  type="number" placeholder="Preço"/>
                        {/* <input className="input-group m-3" type="file" /> */}
                        <button className="btn btn-success ms-3" type="submit" >Adicionar</button>
                        <Link className="btn btn-danger m-2" to='/books'>Cancelar</Link>
                    </form>
                </div>
            </div>
           </div>
        </div>
    );
}