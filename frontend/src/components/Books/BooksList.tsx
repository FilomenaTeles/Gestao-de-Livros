import {useEffect, useState } from 'react';
import api from '../../services/APIService';
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
import { EditBookDTOSchema } from '../../models/Books/EditBookDTO';
import { BookDTO } from '../../models/Books/BookDTO';


export function AllBooks(){

  const [data, setData] = useState<BookListDTO[]>([]);
  const [pageCount, setPageCount] = useState(1);
  const [updateData, setUpdatedata]= useState(true);

  const service = new BookService();

  const [currentPage, setCurrentPage]= useState<number>();
  const [pageSize, setPageSize]= useState(6);
  const [currentSorting, setCurrentSorting] = useState<string>("");
  const [inputSearch, setInputSearch] = useState<string>("");
  const [forcePage, setForcePage]=useState(0);   //dá o highligtht na paginação
  
  const [bookSelected,setBookSelected] = useState<BookDTO>(new BookDTO());
  
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

useEffect(()=>{
  if(updateData)
  {
    fetchData(currentPage ?? 1, pageSize?? 6, currentSorting, inputSearch);
    setUpdatedata(false);
  } 
}, [updateData])


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
    
  var responseValidate = EditBookDTOSchema.validate(bookSelected,{
    allowUnknown: true,
    });
  if(responseValidate.error != null){
    var message = responseValidate.error!.message;
    Toast.Show("error",message);
    return
  }
    var response = await service.Update(bookSelected)

    if(response.success){
      setUpdatedata(true);
      Toast.Show("success","Livro editado com sucesso")
      openCloseModalEdit();

    }else{
      Toast.Show("error",response.message)
    }
}

  const requestDelete = async()=>{
    var response = await service.Delete(bookSelected)

   if(response.success){
      setUpdatedata(true);
      Toast.Show("success","Livro eliminado com sucesso")
      openCloseModalDelete();

   }else{

    Toast.Show("error",response.message)
  }
  }

  function orderBy(e:any){
    const option=e;
     
    setCurrentSorting(option);

    setUpdatedata(true);
     
  }; 
 

  const handlePageClick = async (data:any)=>{
  
    let currentPag = data.selected +1;
    setCurrentPage(currentPag);
    setForcePage(data.selected); //dá o highligtht na pagina selecionada
    setUpdatedata(true);
  }
 

   //LIMPAR FILTRO  

  const searchReset = () => {
    setInputSearch("");
    fetchData(currentPage ?? 1, pageSize?? 6,currentSorting,inputSearch);
    setForcePage(0); //dá o highligtht para a pagina 1
     
  };

  //FILTRO
  const requestGetBy = async(e:any) => {
   
    e.preventDefault();
  
    const input = inputSearch.toLowerCase().trim();
    setInputSearch(input);
    setUpdatedata(true);
    setForcePage(0);  //dá o highligtht para a pagina 1
   
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
             {data.map((book: BookDTO) =>(
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
                  {...bookSelected.authorId == author.id?(
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