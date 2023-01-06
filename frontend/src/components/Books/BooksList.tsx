import React, { ChangeEvent, useEffect, useState } from 'react';
import api from '../../services/api';
import { BookCard } from '../global/Card';
import "./booklist.css"
import {Modal, ModalBody, ModalFooter, ModalHeader} from 'reactstrap';
import { Collapse, Button, CardBody, Card } from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import ReactPaginate from 'react-paginate';
import {BsBook} from "react-icons/bs";
import {BiBookAdd, BiImageAdd} from "react-icons/bi";
import NotFound from '../../assets/nodata.png';

import Toast from "../global/Toast";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


export function AllBooks(){
 
  const [allBooks, setAllBooks]= useState([{
    name: '',
    author: '',
    isbn: 0,
    price: 0.0,
    id:0,
    image:''
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
    id:0,
    image:''
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
    const [getBooks, setGetBooks] = useState({
        currentPage: 1,
        pageSize: 6,
        sortingParameter: "name-asc",
        searchParameter: ""
    }
     );

    const requestGet = async() =>{
      //console.log(getBooks)
      api.post('api/Books/getBooks',getBooks).then(response => {
        setAllBooks(response.data.items);
        setPageCount(response.data.totalPages);
        
      }).catch(error =>{
        Toast.Show("error",error)
        console.log(error);
      })
  };

  const requestUpdate = async()=>{
    console.log(bookSelected)
   if(bookSelected.name =="" || bookSelected.author=="" || bookSelected.isbn==0  ){
    Toast.Show("error","Todos os campos têm que estar preenchidos para editar o livro")
   }
   else if(bookSelected.price == 0){
    Toast.Show("error","Insira um valor superior a 0")
   }
   else{
    api.post( "api/Books/update", bookSelected)
    .then(response => {
      var resp = response.data;
      var auxiliarData = allBooks;

      auxiliarData.map((book: {id:number; name:string;author:string;price:number; isbn:number; image:string}) => {
        if(book.id === bookSelected.id){
          book.name = resp.name;
          book.author = resp.author;
          book.price = resp.price;
          book.isbn = resp.isbn;
          book.image = resp.image;
        }
      });
      setUpdatedata(true);
      if(response.data.success){
        Toast.Show("success","Livro editado com sucesso")
        openCloseModalEdit();
      }else{
        Toast.Show("error",response.data.message)
      }
      

    }).catch(error =>{
      console.log(error);
    })
   }

   
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

  function orderBy(e:any){
      const option=e;
      
      console.log(atualPage);

      setGetBooks({
        ...getBooks, sortingParameter : option
      })

      setUpdatedata(true);
     
  }; 
  //dá o highligtht na paginação
  const [forcePage, setForcePage]=useState(0);

  const handlePageClick = async (data:any)=>{
  
    let currentPag = data.selected +1
    setGetBooks({
      ... getBooks, currentPage : currentPag
     })
     setForcePage(data.selected); //dá o highligtht na pagina selecionada
    setUpdatedata(true);
  }
 

   //LIMPAR FILTRO  
  const [inputSearch, setInputSearch] = useState('');

  const searchReset = () => {
    setInputSearch("");
    
    setGetBooks({
      ... getBooks, searchParameter  : "",
      currentPage : 1
     
     })
     requestGet();
     setForcePage(0); //dá o highligtht para a pagina 1
     
     //setUpdatedata(true);
     console.log(getBooks)
  };

  //FILTRO
  const requestGetBy = async(e:any) => {
    setAtualPage(1);
    e.preventDefault();
  
    const input = inputSearch.toLowerCase().trim();
  
    setForcePage(0);  //dá o highligtht para a pagina 1
    setGetBooks({
      ... getBooks, searchParameter  : input,
      currentPage : 1
     })
     
     setUpdatedata(true);

  }


  //teste adicionar:

  //estado para controlar o modal
  const [modalCreate, setModalCreate]=useState(false);

  //metodo para alternar estados do modal
  function openCloseModalCreate(){
    setModalCreate(!modalCreate);
    setNewBook({
      ...newBook, name:'',
      author:'',
      isbn:0,
      price:0,
      image:''
    });
    
  }
  const [newBook,setNewBook]= useState({
    name: '',
    author: '',
    isbn: 0,
    price: 0.0,
    image: ''
});
const handleChangeCreate = (e: any) => {
  const {name, value} = e.target;
  setNewBook({
    ...newBook,[name]:value
  });
  console.log(newBook);
}
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
          openCloseModalCreate()
          //toggle()
          setUpdatedata(true)
        }
        
    }).catch(error =>{
        Toast.Show("error",error)
        console.log(error);
      });
    }
    
 }

 const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

console.log(allBooks)

  return (
    <div className='container mt-4'>
      
      <div className='container row'>
        <div className='col-8'>
          <form className=" mb-3"  onSubmit={requestGetBy}>
            <input type="text" name='search' value={inputSearch} onChange={(e) => setInputSearch(e.target.value)}/>
            {inputSearch.length< 3 
            ? (
              <button className='btn ms-2' disabled type='submit' >Pesquisar</button>
              
            )
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

       {allBooks.length === 0 ?
       (
         <div className='container mt-3 ms-3 mb-0 text-center'>
             <h5 className='text-start'>Livro não encontrado</h5>
             <img src={NotFound} alt="not found data" className='not-found-img'/>
         </div>
       ):(
         <ul id='book-ul'>
             {allBooks.map((book: {id:number,isbn: number;name:string; author:string; price: any; image:string}) =>(
             <li id='book-li' key={book.id}>
              
                 <BookCard 
                 delete={()=>selectBook(book,'delete')}
                   edit={()=>selectBook(book,'edit')}
                   name={book.name} 
                   author={book.author} 
                   price={parseFloat(book.price).toFixed(2).toString().replace(".",",")}
                   isbn={book.isbn}
                   id={book.id}
                   img={book.image}
               />
             </li>
             ))}
         </ul>
       )}
        
        <ToastContainer />

      <ReactPaginate 
        previousLabel={'previous'}
        nextLabel={'next'}
        breakLabel={'...'} 
        forcePage={forcePage}
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
                    <input type="number" className='form-control' name='isbn' required onChange={handleChange} value={bookSelected && bookSelected.isbn} />
                    <br/>
                    <label>Nome:</label>
                    <br/>
                    <input type="text" className='form-control' name='name'required onChange={handleChange} value={bookSelected && bookSelected.name} />
                    <label>Autor:</label>
                    <br/>
                    <input type="text" className='form-control'  name='author' required onChange={handleChange}  value={bookSelected && bookSelected.author}/>
                    <label>Preço:</label>
                    <br/>
                    <input type="number" className='form-control'  name='price' required onChange={handleChange} value={bookSelected && bookSelected.price} />
                    <label>Imagem:</label>
                    <br/>
                    <input type="url" className='form-control' pattern="https://.*"  name='image'  onChange={handleChange}  value={bookSelected && bookSelected.image}/>

                    </div>
                </ModalBody>
                <ModalFooter>
                    <button id='btn-edit' className='btn btn-primary 'onClick={()=>requestUpdate()}>Editar</button> {"  "}
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

            <Modal isOpen={modalCreate}>
                <ModalHeader><BsBook size={25}/> Novo Livro</ModalHeader>
                <ModalBody>
                    <div className='form-group'>
                      
                    <label>Isbn:</label>
                    <input type="number" className='form-control' name='isbn' required onChange={handleChangeCreate} />
                    <br/>
                    <label>Nome:</label>
                    <br/>
                    <input type="text" className='form-control' name='name' required onChange={handleChangeCreate}  />
                    <label>Autor:</label>
                    <br/>
                    <input type="text" className='form-control'  name='author' required onChange={handleChangeCreate}  />
                    <label>Preço:</label>
                    <br/>
                    <input type="number" className='form-control'  name='price' required onChange={handleChangeCreate}  />
                    <br />
                    <React.StrictMode>
                      <button className='btn' onClick={toggle}><BiImageAdd size={25}/> Associar Imagem</button>
                      <Collapse isOpen={isOpen} >
                      <label>Associar o link da imagem</label>
                        <input type="url" pattern="https://.*"  className='form-control'  name='image'  onChange={handleChangeCreate} />
                        <span className="validity"></span>
                      </Collapse>
                    </React.StrictMode>

                    </div>
                </ModalBody>
                <ModalFooter>
                    <button id='btn-edit' className='btn btn-primary 'onClick={()=>requestCreate()}>Adicionar</button> {"  "}
                    <button id='btn-cancel' className='btn btn-danger' onClick={()=>openCloseModalCreate()}>Cancelar</button>    
                </ModalFooter>
      </Modal>
      
    </div>
  );
}