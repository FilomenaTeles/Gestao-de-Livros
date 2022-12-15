import api from "../../services/api";
import "./styles.css"

import {BsBook} from "react-icons/bs";
import { Link, useNavigate, redirect} from "react-router-dom";
import { ChangeEvent, useEffect, useState } from "react";


export function AddBook(){

    const navigate = useNavigate();
    const [newBook,setNewBook]= useState({
        name: '',
        author: '',
        isbn: 0,
        price: 0.0,
    });
    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target;
        setNewBook({
          ...newBook,[name]:value
        });
        console.log(newBook);
      }

  async function postRequest(event: any) {
    try{
        await api.post('api/Books',newBook);
       
          
    }catch(error){
            alert('Erro ao adicionar novo livro: '+error);
    }
     navigate('/books');
    redirect('/books');
  }

    return(
        <div className="add-book-container">
           <div className="container p-3 mt-5">
            <h3 className="text-center"><BsBook size={55}/> Adicionar novo Livro</h3>
            <div className="container row">
                <div className="container col-6">
                    <form onSubmit={postRequest}>
                        <input className="input-group m-3" type="text" placeholder="Nome" name="name" onChange={handleChange} />
                        <input className="input-group m-3"  type="text" placeholder="Autor" name="author" onChange={handleChange}/>
                        <input className="input-group m-3"  type="number" placeholder="ISBN" name="isbn" onChange={handleChange}/>
                        <input className="input-group m-3"  type="double" placeholder="Preço" name="price" onChange={handleChange}/>
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