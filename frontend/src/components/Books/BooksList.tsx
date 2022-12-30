import React, { ChangeEvent, useEffect, useState } from 'react';
import api from '../../services/api';
import { BookCard } from '../global/Card';
import "./booklist.css"
import {Modal, ModalBody, ModalFooter, ModalHeader} from 'reactstrap';

import 'bootstrap/dist/css/bootstrap.min.css';
import ReactPaginate from 'react-paginate';
import { isDisabled } from '@testing-library/user-event/dist/utils';

export function AllBooks(){
 
  const [allBooks, setAllBooks]= useState([{
    name: '',
    author: '',
    isbn: 0,
    price: 0.0,
    id:0
  }]);

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

    const [atualPage,setAtualPage]=useState(1);
    const [pageCount, setPageCount] = useState(0);

    const requestGet = async() =>{
      api.get('api/Books').then(response => {
        setAllBooks(response.data.items);
        setPageCount(response.data.totalPages);
        console.log(response.data.items)
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
 
const [orderValue, setOrderValue]=useState("");
const [orderData, setOrderData]=useState(false)

  function orderBy(e:any){
      const option=e;
      setOrderValue(option);
     api.get('api/Books?PageNumber='+atualPage+'&PageSize=3&orderValue='+option)
     .then(response => {
        setAllBooks(response.data);
        setOrderData(true)
     })
     
  }; 

  //paginação
  const fetchBooks = async (currentPage: number) => {
    var res: any
    if(orderData){
       res = await fetch('https://localhost:7124/api/Books?currentPage='+currentPage+'&pageSize=6&orderValue='+orderValue);

    }else{
      res = await fetch('https://localhost:7124/api/Books?currentPage='+currentPage);

    }
    const temp = res.json();
    return temp;
  }; 

  const handlePageClick = async (data:any)=>{
   
    let currentPage = data.selected +1
    const booksFormServer = await fetchBooks(currentPage);
    setAllBooks (booksFormServer.items);
    setAtualPage(currentPage);
  }
 

   //FILTRO  
  const [inputSearch, setInputSearch] = useState('');
  const searchReset = () => {
    setInputSearch("");
    setFilter([]);
    requestGet();
  };

 /*  const searchBooks = (searchValue:any) => {
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
  } */
  const [filter, setFilter]=useState([]);

  const requestGetBy = async(e:any) => {
    setAtualPage(1);
    e.preventDefault();
  
    const input = inputSearch.toLowerCase();

     api.get("api/Books/GetBooksBy?PageNumber="+atualPage+"&PageSize=3&searchValue="+input)
     .then(response => {
      setFilter(response.data);
      const sizeData=response.data;
      const size = sizeData.length;
      setPageCount(Math.ceil(size/3))
      console.log(atualPage);

     }).catch((error) => {
      console.log(error);
    });
  }

  return (
    <div className='container mt-4'>
      <div className='container row'>
        <div className='col-8'>
          <form className=" mb-3"  onSubmit={requestGetBy}>
            <input type="text" name='search' value={inputSearch} onChange={(e) => setInputSearch(e.target.value)}/>
            {inputSearch.length< 3 
            ? (<button className='btn ms-2' disabled type='submit' >Pesquisar</button>)
            :(<button className='btn ms-2' type='submit' >Pesquisar</button>)} 
            
            <button className="btn md-2" onClick={() => searchReset()}>Limpar</button>
          </form>
        </div>
        <div className='container text-end col-4'>
          <select className='' name="orderBy" id="orderBy" onChange={(e)=>orderBy(e.target.value)}>
            {/* <option defaultValue="" selected disabled>Ordenar por:</option> */}
            <option value="name-asc">Nome (ASC)</option>
            <option value="price-asc">Preço (ASC)</option>
            <option value="name-desc">Nome (DESC)</option>
            <option value="price-desc">Preço (DESC)</option>
          </select>
        </div>
      </div>
      {filter.length< 1 ? (
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
           
      <ReactPaginate 
        previousLabel={'previous'}
        nextLabel={'next'}
        breakLabel={'...'} 
        pageCount={pageCount}
        marginPagesDisplayed={3}
        pageRangeDisplayed={4}
        onPageChange={handlePageClick}
        containerClassName={'pagination justify-content-center'}
        pageClassName={'page-item'}
        pageLinkClassName={'page-link'}
        previousClassName={'page-item'}
        previousLinkClassName={'page-link'}
        nextClassName={'page-item'}
        nextLinkClassName={'page-link'}
        breakClassName={'page-item'}
        breakLinkClassName={'page-link'}
        activeClassName={'active'}
  />

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