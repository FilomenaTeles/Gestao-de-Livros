import React from "react";
import { Link } from "react-router-dom";

import imagem from '../assets/home-image.png';

export function Home(){
    return(
        <div className="container text-center p-5 ">
          <h1>Catálogo de Livros</h1>
          <Link to={'/books'}>
            <img src={imagem} alt="book shelf" className=" p-4"/>
            </Link>
            
            
        </div>
    );
}