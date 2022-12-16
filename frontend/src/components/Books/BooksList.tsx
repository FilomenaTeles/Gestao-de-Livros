import React, { ChangeEvent, useEffect, useState } from 'react';
import api from '../../services/api';
import { BookCard } from '../global/Card';
import "./booklist.css"
import {Modal, ModalBody, ModalFooter, ModalHeader} from 'reactstrap';

import 'bootstrap/dist/css/bootstrap.min.css';

export function AllBooks(){
 
  const [allBooks, setAllBooks]= useState([]);

   //estado para controlar o modal
   const [modalEdit, setModalEdit]=useState(false);

   //metodo para alternar estados do modal
   function openCloseModalEdit(){
     setModalEdit(!modalEdit);
   }

   //estado para controlar o modal
   const [modalDelete, setModalDelete]=useState(false);

   //metodo para alternar estados do modal
   const openCloseModalDelete=() =>{
     setModalDelete(!modalDelete);
   }

   const [bookSelected,setBookSelected]= useState({
    name: '',
    author: '',
    isbn: 0,
    price: 0.0,
    id:0
});

function selectBook (book:any, option:string){
    setBookSelected(book);
    (option=='edit') ? openCloseModalEdit(): openCloseModalDelete();
};
//FILTRO  
  const [inputSearch, setInputSearch] = useState('');
  const [filter, setFilter]= useState([]);

  const searchBooks = (searchValue:any) => {
    setInputSearch(searchValue);

    if(inputSearch != ''){
        const booksFiltered=allBooks.filter((item)=>{
          return Object.values(item).join('').toLowerCase().includes(inputSearch.toLowerCase())
        });
        setFilter(booksFiltered);
    }
    else{
      setFilter(allBooks);
    }
  }

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

  const requestPut = async()=>{
   
   api.put( "api/Books/"+bookSelected.id, bookSelected)
    .then(response => {
      var resp = response.data;
      var auxiliarData = allBooks;

      auxiliarData.map((book: {id:number; name:string;author:string;price:number; isbn:number}) => {
        if(book.id === bookSelected.id){
          book.name = resp.name;
          book.author= resp.author;
          book.price= resp.price;
          book.isbn= resp.isbn;
        }
      });
      setUpdatedata(true);
      openCloseModalEdit();

    }).catch(error =>{
      console.log(error);
    })
  }

  const requestDelete = async()=>{

    api.delete("api/Books/"+bookSelected.id)
    .then(response => {
      setAllBooks(allBooks.filter((book:any) => book.id !== response.data));
      setUpdatedata(true);
      openCloseModalDelete();

    }).catch(error =>{
      console.log(error);
    })
  }

  return (
    <div className='container mt-4'>
      <form className="mt-3 ">
        <input type="text" placeholder="Filtrar" onChange={(e)=> searchBooks(e.target.value)}/>
                
      </form>
            {inputSearch.length< 1 ? (
              <ul id='book-ul'>
        {allBooks.map((book: {id:number,isbn: number;name:string; author:string; price: number}) =>(
         <li id='book-li' key={book.id}>
             <BookCard 
             delete={()=>selectBook(book,'delete')}
              edit={()=>selectBook(book,'edit')}
              name={book.name} 
              author={book.author} 
              price={book.price}
              isbn={book.isbn}
              id={book.id}
            
          />
         </li>
        
        ))}
      </ul>
            ):(
              <ul id='book-ul'>
              {filter.map((book: {id:number,isbn: number;name:string; author:string; price: number}) =>(
               <li id='book-li' key={book.id}>
                   <BookCard 
                   delete={()=>selectBook(book,'delete')}
                    edit={()=>selectBook(book,'edit')}
                    name={book.name} 
                    author={book.author} 
                    price={book.price}
                    isbn={book.isbn}
                    id={book.id}
                  
                />
               </li>
              
              ))}
            </ul>
            )}
      

      <Modal isOpen={modalEdit}>
                <ModalHeader>Editar Livro</ModalHeader>
                <ModalBody>
                    <div className='form-group'>
                      <input type="number" hidden name='id' value={bookSelected && bookSelected.id}/>
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
                    <button id='btn-edit' className='btn btn-primary 'onClick={()=>requestPut()}>Editar</button> {"  "}
                    <button id='btn-cancel' className='btn btn-danger' onClick={()=>openCloseModalEdit()}>Cancelar</button>    
                </ModalFooter>
            </Modal>

            <Modal isOpen={modalDelete}>
              <ModalBody>
                Esta ação vai eliminar o livro: <br />
                Titulo: {bookSelected && bookSelected.name} <br />
                Autor: {bookSelected && bookSelected.author} <br />
                ISBN: {bookSelected && bookSelected.isbn} <br />
                <b>Deseja continuar?</b>
              </ModalBody>
              <ModalFooter>
                <button className='btn btn-danger' onClick={()=>requestDelete()}>Eliminar</button>
                <button className='btn btn-secondary' onClick={()=>openCloseModalDelete()}>Cancelar</button>
              </ModalFooter>
            </Modal>
      
    </div>
  );
}