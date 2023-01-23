import {useEffect, useState } from 'react';
import {Card } from '../global/Card';
import "./booklist.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import NotFound from '../../assets/nodata.png';
import Toast from "../../helpers/Toast";
import 'react-toastify/dist/ReactToastify.css';
import { BookService } from '../../services/BookService';
import { BookListDTO } from '../../models/Books/BookListDTO';
import { EditBookDTOSchema } from '../../models/Books/EditBookDTO';
import { BookDTO } from '../../models/Books/BookDTO';
import { SeacrhBy } from '../global/Search';
import { OrderBy } from '../global/OrderBy';
import { BookDeleteModal, BookModal } from '../global/Modal';
import { Pagination } from '../global/Pagination';


export function AllBooks(){

  const [data, setData] = useState<BookListDTO[]>([]);
  const [pageCount, setPageCount] = useState(1);
  const [updateData, setUpdatedata]= useState(true);

  const service = new BookService();

  const [currentPage, setCurrentPage]= useState<number>();
  const [pageSize, setPageSize]= useState(6);
  const [currentSorting, setCurrentSorting] = useState<string>("");
  const [inputSearch, setInputSearch] = useState<string>(""); //filtro
  const [forcePage, setForcePage]=useState(0);   //dá o highligtht na paginação
  
  const [bookSelected,setBookSelected] = useState<BookDTO>(new BookDTO());
  const [modalEdit, setModalEdit]=useState(false); //estado para controlar o modal
  const [modalDelete, setModalDelete]=useState(false); //estado para controlar o modal

  useEffect(()=>{
    if(updateData)
    {
      fetchData(currentPage ?? 1, pageSize?? 6, currentSorting, inputSearch);
      setUpdatedata(false);
    } 
  }, [updateData])

  const handleChange = (e: any) => {
    const {name, value} = e.target;
    setBookSelected({
      ...bookSelected,[name]:value
    });
  }

  //FILTRO
  const requestGetBy = async(e:any) => {
    e.preventDefault();
    const input = inputSearch.toLowerCase().trim();
    setInputSearch(input);
    setCurrentPage(1);
    setUpdatedata(true);
    setForcePage(0);  //dá o highligtht para a pagina 1  
  }

  //LIMPAR FILTRO  
  const searchReset = () => {
    setInputSearch("");
    fetchData(currentPage ?? 1, pageSize?? 6,currentSorting,inputSearch);
    setForcePage(0); //dá o highligtht para a pagina 1   
  };

  //CLIQUE NA PAGINAÇÃO
  const handlePageClick = async (data:any)=>{
    let currentPag = data.selected +1;
    setCurrentPage(currentPag);
    setForcePage(data.selected); //dá o highligtht na pagina selecionada
    setUpdatedata(true);
  }

  //FUNÇÕES

  //metodo para alternar estados do modal
  function openCloseModalEdit(){
     setModalEdit(!modalEdit);
   }

   //metodo para alternar estados do modal
   const openCloseModalDelete=() =>{
     setModalDelete(!modalDelete);
   }

function selectBook (book:any, option:string){
    setBookSelected(book);
    (option=='edit') ? openCloseModalEdit(): openCloseModalDelete();
};

const orderBy =(e:any) => {
  const option=e.target.value; 
  setCurrentSorting(option);
  setUpdatedata(true); 
}; 

const setSearch = (e:any)=>{
  setInputSearch(e.target.value)
}

 //PEDIDOS API

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

  return (
    <div className='container mt-4'>
      <div className='container row'>
        <SeacrhBy
        setSearch = {setSearch}
        inputSearch = {inputSearch}
        requestGetBy = {requestGetBy}
        searchReset = {searchReset}
        />

        <OrderBy isBook = {true} onChange = {orderBy}/>
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
              
                 <Card 
                  isBook ={true}
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
        
      <BookModal
        modalEdit = {modalEdit}
        bookSelected = {bookSelected}
        handleChange = {handleChange}
        requestUpdate = {requestUpdate}
        openCloseModalEdit = {openCloseModalEdit}
      />

      <BookDeleteModal 
        modalDelete = {modalDelete}
        bookSelected = {bookSelected}
        requestDelete = {requestDelete}
        openCloseModalDelete = {openCloseModalDelete}
      />

      <Pagination
        forcePage = {forcePage}
        pageCount = {pageCount}
        handlePageClick = {handlePageClick}
      />
       
    </div>
  );
}