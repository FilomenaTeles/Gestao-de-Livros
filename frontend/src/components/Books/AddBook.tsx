import api from "../../services/api";
import "./styles.css"

import {BsBook} from "react-icons/bs";
import { Link, useNavigate, redirect} from "react-router-dom";
import { ChangeEvent, useEffect, useState } from "react";

import Toast from "../global/Toast";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


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
      
     const postRequest = async() => {
        await api.post('api/Books/create', newBook).then(response => {
           
            alert("alerta")
            if(response.data.success == false){
                alert(response.data.message)
                Toast.Show("error",response.data.message)
            }
        }).catch(error =>{
            Toast.Show("error",error)
            console.log(error);
          });
     }

  async function postRequeste(event: any) {
    try{
        //console.log(newBook);
        alert();
        
        await api.post('api/Books/create',newBook)
        /*.then(response => {
            alert("alerta")
            if(response.data.success == false){
                alert(response.data.message)
                Toast.Show("error",response.data.message)
            }
        });*/
        navigate(-1);

          
    }catch(error){
            alert('Erro ao adicionar novo livro: '+error);
    }
    // <Link to={'/books'}></Link>
    
    // redirect('/books');
  }

  function test  () {
    Toast.Show("error","erro")
  }

    return(
        <div className="add-book-container">
           <div className="container p-3 mt-5">
            <h3 className="text-center"><BsBook size={55}/> Adicionar novo Livro</h3>
            <div className="container row">
                <div className="container col-6">
                    <form onSubmit={postRequest}>
                        <input className="input-group m-3" type="text" placeholder="Nome" name="name" required onChange={handleChange} />
                        <input className="input-group m-3"  type="text" placeholder="Autor" name="author" required onChange={handleChange}/>
                        <input className="input-group m-3"  type="number" placeholder="ISBN" name="isbn" required onChange={handleChange}/>
                        <input className="input-group m-3"  type="number" placeholder="Preço" name="price" min={0} required onChange={handleChange}/>
                        {/* <input className="input-group m-3" type="file" /> */}
                        <button className="btn btn-success ms-3" type="submit" >Adicionar</button>
                        <Link className="btn btn-danger m-2" to='/books'>Cancelar</Link>
                    </form>
                    <button className="btn" onClick={test}>Teste</button>
                    <ToastContainer />
                </div>
            </div>
           </div>
        </div>

    );
}