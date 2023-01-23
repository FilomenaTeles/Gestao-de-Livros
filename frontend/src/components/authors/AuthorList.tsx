import {useEffect, useState } from "react";
import {Card } from "../global/Card";
import Toast from "../../helpers/Toast";
import NotFound from '../../assets/nodata.png';
import { AuthorService } from "../../services/AuthorService";
import { AuthorListDTO } from "../../models/Authors/AuthorListDTO";
import { AuthorDTO } from "../../models/Authors/AuthorDTO";
import { EditAuthorDTOSchema } from "../../models/Authors/EditAuthorDTO";
import { OrderBy } from "../global/OrderBy";
import { SeacrhBy } from "../global/Search";
import { AuthorDeleteModal, AuthorModal } from "../global/Modal";
import { Pagination } from "../global/Pagination";

export function AuthorList(){
    
    const [data, setData] = useState<AuthorListDTO[]>([]);
    const [pageCount, setPageCount] = useState(0);
    const [updateData, setUpdatedata]= useState(true);
    
    const service = new AuthorService;

    const [currentPage, setCurrentPage]= useState<number>();
    const [pageSize, setPageSize]= useState(6);
    const [currentSorting, setCurrentSorting] = useState<string>("");
    const [inputSearch, setInputSearch] = useState(''); //filtro
    const [forcePage, setForcePage]=useState(0);    //dá o highligtht na paginação
    
    const [authorSelected,setAuthorSelected]= useState<AuthorDTO>(new AuthorDTO());
    
   const [modalEdit, setModalEdit]=useState(false); //estado para controlar o modal
   const [modalDelete, setModalDelete]=useState(false);
      

    useEffect(()=>{
        if(updateData)
        {
            fetchData(currentPage ?? 1, pageSize?? 6, currentSorting, inputSearch);
            setUpdatedata(false);
        } 
    }, [updateData])

    const handleChange = (e: any) => {
        const {name, value} = e.target;
        setAuthorSelected({
            ...authorSelected,[name]:value
        });
    }

    //FILTRO
  const requestGetBy = async(e:any) => {
        
        e.preventDefault();
        const input = inputSearch.toLowerCase().trim();
        setInputSearch(input);
        setCurrentPage(1);
        setForcePage(0);  //dá o highligtht para a pagina 1
        setUpdatedata(true);
    }

  //LIMPAR FILTRO  
  
  const searchReset = () => {
        setInputSearch("");
        fetchData(currentPage ?? 1, pageSize?? 6, currentSorting, inputSearch);
        setForcePage(0); //dá o highligtht para a pagina 1
     
    };

  //CLIQUE NA PAGINAÇÃO
  const handlePageClick = async (data:any)=>{
        let currentPag = data.selected +1
        setCurrentPage(currentPag);
        setForcePage(data.selected); //dá o highligtht na pagina selecionada
        setUpdatedata(true);
    }

    //FUNÇÕES

    function selectAuthor (author:any, option:string){
        setAuthorSelected(author);
        (option=='edit') ? openCloseModalEdit(): openCloseModalDelete();
    };

    //metodo para alternar estados do modal
   function openCloseModalEdit(){
        setModalEdit(!modalEdit);
    }
    const openCloseModalDelete=() =>{
        setModalDelete(!modalDelete);
    }

    function orderBy(e:any){
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


  const requestEdit = async()=>{
    
    var responseValidate = EditAuthorDTOSchema.validate(authorSelected,{
        allowUnknown: true,
        });
      if(responseValidate.error != null){
        var message = responseValidate.error!.message;
        Toast.Show("error",message);
        return
      }
        var response = await service.Edit(authorSelected)
    
        if(response.success){
          setUpdatedata(true);
          Toast.Show("success","Autor editado com sucesso")
          openCloseModalEdit();
    
        }else{
          Toast.Show("error",response.message)
        }
}

const requestDelete = async()=>{
    var response = await service.Delete(authorSelected)
     if(response.success){
        setUpdatedata(true);
        Toast.Show("success","Autor eliminado com sucesso")
        openCloseModalDelete();
     }else{
      Toast.Show("error",response.message)
    }
}


    return(
        <div className="container mt-4">

            <div className='container row'>
                <SeacrhBy
                    setSearch = {setSearch}
                    inputSearch = {inputSearch}
                    requestGetBy = {requestGetBy}
                    searchReset = {searchReset}
                />
                <OrderBy onChange = {orderBy}/>
            </div>
            
            {data.length === 0 ?
            (
                <div className='container mt-3 ms-3 mb-0 text-center'>
                    <h5 className='text-start'>Livro não encontrado</h5>
                    <img src={NotFound} alt="not found data" className='not-found-img'/>
                </div>
            ):(
                <ul id='book-ul'>
                    {data.map((author: AuthorDTO) =>(
                    <li id='book-li' key={author.id}>
                    
                        <Card 
                        delete={()=>selectAuthor(author,'delete')}
                        edit={()=>selectAuthor(author,'edit')}
                        name={author.name} 
                        country={author.country}
                        id={author.id}
                        img={author.image}
                        books={author.books.join("; ")}
                    />
                    </li>
                    ))}
                </ul>
            )}

            <AuthorModal
                modalEdit = {modalEdit}
                authorSelected = {authorSelected}
                handleChange = {handleChange}
                requestEdit = {requestEdit}
                openCloseModalEdit = {openCloseModalEdit}
            />

            <AuthorDeleteModal
                modalDelete = {modalDelete}
                authorSelected = {authorSelected}
                requestDelete = {requestDelete}
                openCloseModalDelete ={openCloseModalDelete}
            />

            <Pagination
                forcePage = {forcePage}
                pageCount = {pageCount}
                handlePageClick = {handlePageClick}
            />
           

        </div>
    )
}