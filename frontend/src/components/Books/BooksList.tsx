import React, { ChangeEvent, useEffect, useState } from 'react';
import api from '../../services/api';
import { BookCard } from '../global/Card';
import "./booklist.css"
import {Modal, ModalBody, ModalFooter, ModalHeader, Button} from 'reactstrap';

import 'bootstrap/dist/css/bootstrap.min.css';

export function AllBooks(){
 
  const [allBooks, setAllBooks]= useState([]);

   //estado para controlar o modal
   const [modalEditar, setModalEditar]=useState(false);

   //metodo para alternar estados do modal
   function abrirFecharModalEditar(){
     setModalEditar(!modalEditar);
   }

   const [bookSelected,setBookSelected]= useState({
    name: '',
    author: '',
    isbn: 0,
    price: 0.0,
    id:0
});

function selectBook (book:any){
    setBookSelected(book);
    abrirFecharModalEditar();
};
    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target;
        setBookSelected({
        ...bookSelected,[name]:value
        });
        console.log(bookSelected);
    }

    const [updateData, setUpdatedata]= useState(true);

    useEffect(()=>{
      if(updateData)
      {
        requestGet();
        setUpdatedata(false);
      } 
    }, [updateData])

    const requestGet = async() =>{
      api.get('api/Books').then(response => {
        setAllBooks(response.data);
      }).catch(error =>{
        console.log(error);
      })
  };

  


  return (
    <div className='container mt-4'>
      
      <ul id='book-ul'>
        {allBooks.map((book: {id:number,isbn: number;name:string; author:string; price: number}) =>(
         <li id='book-li'>
             <BookCard 
              edit={()=>selectBook(book)}
              name={book.name} 
              author={book.author} 
              price={book.price}
              isbn={book.isbn}
              id={book.id}
            
          />
         </li>
        
        ))}
      </ul>

      <Modal isOpen={modalEditar}>
                <ModalHeader>Editar Livro</ModalHeader>
                <ModalBody>
                    <div className='form-group'>
                    <label>Isbn:</label>
                    <input className='form-control' value={bookSelected && bookSelected.isbn} />
                    <br/>
                    <label>Nome:</label>
                    <br/>
                    <input type="text" className='form-control' name='name' onChange={handleChange} value={bookSelected && bookSelected.name} />
                    <label>Autor:</label>
                    <br/>
                    <input type="text" className='form-control'  name='author' onChange={handleChange}  value={bookSelected && bookSelected.author}/>
                    <label>Preço:</label>
                    <br/>
                    <input type="number" className='form-control'  name='price' onChange={handleChange} value={bookSelected && bookSelected.price} />

                    </div>
                </ModalBody>
                <ModalFooter>
                    <button id='btn-edit' className='btn btn-primary ' >Editar</button> {"  "}
                    <button id='btn-cancel' className='btn btn-danger' onClick={()=>abrirFecharModalEditar()}>Cancelar</button>    
                </ModalFooter>
            </Modal>
      
    </div>
  );
}