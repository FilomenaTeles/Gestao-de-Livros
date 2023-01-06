import api from "../../services/api";
import "./styles.css"

import {BsBook} from "react-icons/bs";
import { Link, useNavigate, redirect} from "react-router-dom";
import { ChangeEvent, useEffect, useState } from "react";

import Toast from "../global/Toast";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import React from "react";
import { Collapse } from "reactstrap";
import { BiImageAdd } from "react-icons/bi";


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

    // <Link to={'/books'}></Link>
    
    // redirect('/books');
  

  const requestCreate = async() => {
    console.log(newBook)
      if(newBook.author == "" || newBook.author=="" || newBook.isbn==0 ){
        Toast.Show("error","Prencha todos os campos para inserir um livro")
  
      }else if(newBook.price == 0){
        Toast.Show("error","Insira um valor superior a 0")
       }
      
      else{
        await api.post('api/Books/create', newBook).then(response => {
         
          
          if(response.data.success == false){
          
              Toast.Show("error",response.data.message)
          }else{
            Toast.Show("success","Livro inserido com sucesso")
            navigate(-1);
            //redirect('/books',)
          }
          
      }).catch(error =>{
          Toast.Show("error",error)
          console.log(error);
        });
      }
      
   }

  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);


    return(
        <div className="add-book-container">
           <div className="container p-3 mt-5">
            <h3 className="text-center"><BsBook size={55}/> Adicionar novo Livro</h3>
            <div className="container row">
                <div className="container col-6">
                    
                        <input className="form-control m-3" type="text" placeholder="Nome" name="name" required onChange={handleChange} />
                        <input className="form-control m-3"  type="text" placeholder="Autor" name="author" required onChange={handleChange}/>
                        <input className="form-control m-3"  type="number" placeholder="ISBN" name="isbn" required onChange={handleChange}/>
                        <input className="form-control m-3"  type="number" placeholder="Preço" name="price" min={0} required onChange={handleChange}/>
                        
                        <React.StrictMode>
                            <button className='btn' onClick={toggle}><BiImageAdd size={25}/> Associar Imagem</button>
                            <Collapse isOpen={isOpen} >
                                <input type="url" pattern="https://.*"  className='form-control m-3' placeholder="Associar o link da imagem"  name='image'  onChange={handleChange} />
                                <span className="validity"></span>
                            </Collapse>
                        </React.StrictMode>
                    <br />
                        <button className="btn btn-success ms-3" onClick={requestCreate} >Adicionar</button>
                        <Link className="btn btn-danger m-2" to='/books'>Cancelar</Link>
                
                   
                </div>
            </div>
           </div>
        </div>

    );
}