import {useEffect, useState } from 'react';
import api from '../../services/api';
import { BookCard } from '../global/Card';
import "./booklist.css"
import {Modal, ModalBody, ModalFooter, ModalHeader} from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import ReactPaginate from 'react-paginate';
import NotFound from '../../assets/nodata.png';
import Toast from "../../helpers/Toast";
import 'react-toastify/dist/ReactToastify.css';
import { BookService } from '../../services/BookService';
import { BookListDTO } from '../../models/Books/BookListDTO';


export function AllBooks(){

  const [data, setData] = useState<BookListDTO[]>([]);
  const [pageCount, setPageCount] = useState(1);

  const service = new BookService();

  const [currentPage, setCurrentPage]= useState<number>();
  const [pageSize, setPageSize]= useState(6);
  const [currentSorting, setCurrentSorting] = useState<string>("");
  const [inputSearch, setInputSearch] = useState<string>("");
  
 
  
   //estado para controlar o modal
   const [modalEdit, setModalEdit]=useState(false);

   //metodo para alternar estados do modal
   function openCloseModalEdit(){
     setModalEdit(!modalEdit);
     requestGetAuthors()
   }

   //estado para controlar o modal
   const [modalDelete, setModalDelete]=useState(false);

   //metodo para alternar estados do modal
   const openCloseModalDelete=() =>{
     setModalDelete(!modalDelete);
   }

  const [bookSelected,setBookSelected]= useState({
      name: '',
      authorName: '',
      isbn: 0,
      price: 0.0,
      id:0,
      image:'',
      authorId:0
    });

function selectBook (book:any, option:string){
    setBookSelected(book);
    (option=='edit') ? openCloseModalEdit(): openCloseModalDelete();
};


const handleChange = (e: any) => {
    const {name, value} = e.target;
    setBookSelected({
    ...bookSelected,[name]:value
    });
}

const [updateData, setUpdatedata]= useState(true);

useEffect(()=>{
  if(updateData)
  {
    
    fetchData(currentPage ?? 1, pageSize?? 6, currentSorting, inputSearch)
    setUpdatedata(false);
  } 
}, [updateData])

const [atualPage,setAtualPage]=useState(1);

const [getBooks, setGetBooks] = useState({
    currentPage: 1,
    pageSize: 6,
    sortingParameter: "name-asc",
    searchParameter: ""
  }); 



const fetchData = async (currentPage:number, pageSize:number, sortBy:string |null, searchBy:string |null) =>{

  var response = await service.GetAll(
    currentPage,
    pageSize,
    sortBy,
    searchBy
  );

  if(response.success != true){
    setData([]);
    setPageCount(0);
    Toast.Show("error",response.message);
    return;
  }

  setData(response.items);
  setPageCount(response.totalPages);
  setCurrentPage(currentPage);
}

 
const requestUpdate = async()=>{
    
   if(bookSelected.name =="" || bookSelected.authorName=="" || bookSelected.isbn==0  ){
    Toast.Show("error","Todos os campos têm que estar preenchidos para editar o livro")
   }
   else if(bookSelected.price == 0){
    Toast.Show("error","Insira um valor superior a 0")
   }
   else{
    
    
    api.post( "api/Books/update", bookSelected)
    .then(response => {
      var resp = response.data;
      var auxiliarData = data;

      auxiliarData.map((book: BookListDTO) => {
        if(book.id === bookSelected.id){
          book.name = resp.name;
          book.authorName = resp.authorName;
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
      Toast.Show("error",error)
    })
   }
   
}

  const requestDelete = async()=>{



    api.post("api/Books/delete",bookSelected.id)
    .then(response => {
      setData(data.filter((book:any) => book.id !== response.data));
      setUpdatedata(true);
      openCloseModalDelete();
      Toast.Show("success",response.data.message)

    }).catch(error =>{
      Toast.Show("error",error)
    })
  }

  function orderBy(e:any){
      const option=e;
     
      setGetBooks({
        ...getBooks, sortingParameter : option
      })
      setCurrentSorting(option);

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
 

  const searchReset = () => {
    setInputSearch("");
    
    setGetBooks({
      ... getBooks, searchParameter  : "",
      currentPage : 1
     
     })
     setUpdatedata(true)
     setForcePage(0); //dá o highligtht para a pagina 1
     
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

//Lista Autores:

const [getAuthors, setGetAuthors] = useState({
  currentPage: 1,
  pageSize: 1000
}
);

const [allAuthors, setAllAuthors]= useState([{
  name: '',
  id:0
}]);

const requestGetAuthors = async() =>{
  
  api.post('api/Authors/getAll',getAuthors).then(response => {
    setAllAuthors(response.data.items);
    setGetAuthors({
      ...getAuthors, pageSize : response.data.totalRecords,
    })
    
    
  }).catch(error =>{
    Toast.Show("error",error)
    console.log(error);
  })
};

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

       {data.length === 0 ?
       (
         <div className='container mt-3 ms-3 mb-0 text-center'>
             <h5 className='text-start'>Livro não encontrado</h5>
             <img src={NotFound} alt="not found data" className='not-found-img'/>
         </div>
       ):(
         <ul id='book-ul'>
             {data.map((book: BookListDTO) =>(
             <li id='book-li' key={book.id}>
              
                 <BookCard 
                  delete={()=>selectBook(book,'delete')}
                  edit={()=>selectBook(book,'edit')}
                  name={book.name} 
                  author={book.authorName} 
                  price={(book.price).toFixed(2).toString().replace(".",",")}
                  isbn={book.isbn}
                  id={book.id}
                  img={book.image}
               />
             </li>
             ))}
         </ul>
       )}
        
       

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
            <input type="text" className='form-control' name='name'required onChange={handleChange} value={bookSelected && bookSelected.name} /><br/>
            <label>Autor:</label> <br />
            <select className='form-control' name="authorId" id="authorId" onChange={handleChange}>
                {allAuthors.map((author: {name:string; id:number;}) => (
                  {...bookSelected.authorName == author.name?(
                    <option value={author.id} selected >{author.name}</option>
                  ):(
                    <option value={author.id}>{author.name}</option>
                  )}
                  
                ))}
            </select><br/>
            <label>Preço:</label>
            <br/>
            <input type="number" className='form-control'  name='price' required onChange={handleChange} value={bookSelected && bookSelected.price} /><br/>
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
          Autor: {bookSelected && bookSelected.authorName} <br />
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