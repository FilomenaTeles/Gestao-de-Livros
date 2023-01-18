import {useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import api from "../../services/APIService";
import { AuthorCard } from "../global/Card";
import Toast from "../../helpers/Toast";
import NotFound from '../../assets/nodata.png';
import { Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";
import { AuthorService } from "../../services/AuthorService";
import { AuthorListDTO } from "../../models/Authors/AuthorListDTO";
import { AuthorDTO } from "../../models/Authors/AuthorDTO";

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

    
    //estado para controlar o modal
   const [modalEdit, setModalEdit]=useState(false);
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
        const option=e;
        setCurrentSorting(option);
        setUpdatedata(true);
    }; 
  
  
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
    
        if(authorSelected.name =="" || authorSelected.country==""   ){
            Toast.Show("error","Todos os campos têm que estar preenchidos para editar o livro")
        }
        else{
            api.post( "api/Authors/edit", authorSelected)
            .then(response => {
                var resp = response.data;
            
                data.map((author: AuthorDTO) => {
                    if(author.id === authorSelected.id){
                        author.name = resp.name;
                        author.country = resp.country
                        author.image = resp.image;
                    }
                });
                setUpdatedata(true);
                if(response.data.success){
                    Toast.Show("success","Livro editado com sucesso")
                    openCloseModalEdit();
                }else{
                    Toast.Show("error",response.data.message)
                }
            })
            .catch(error =>{
                Toast.Show("error",error)
                console.log(error);
            })
        }
    }

    const requestDelete = async()=>{
        api.post("api/Authors/delete",authorSelected.id)
        .then(response => {
            setUpdatedata(true);
            openCloseModalDelete();
            Toast.Show("success",response.data.message)
        })
        .catch(error =>{
            Toast.Show("error",error)
        })
    }

    return(
        <div className="container mt-4">

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
                        <option value="name-asc">Nome (ASC)</option>
                        <option value="country-asc">País (ASC)</option>
                        <option value="name-desc">Nome (DESC)</option>
                        <option value="country-desc">País (DESC)</option>
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
                    {data.map((author: AuthorDTO) =>(
                    <li id='book-li' key={author.id}>
                    
                        <AuthorCard 
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
                        <input type="number" hidden name='id' value={authorSelected && authorSelected.id}/>
                    
                        <label>Nome:</label>
                        <br/>
                        <input type="text" className='form-control' name='name'required onChange={handleChange} value={authorSelected && authorSelected.name} />
                        <label>País:</label>
                        <br/>
                        <input type="text" className='form-control'  name='country' required onChange={handleChange}  value={authorSelected && authorSelected.country}/>
                        
                        <label>Imagem:</label>
                        <br/>
                        <input type="url" className='form-control' pattern="https://.*"  name='image'  onChange={handleChange}  value={authorSelected && authorSelected.image}/>

                    </div>
                </ModalBody>
                <ModalFooter>
                    <button id='btn-edit' className='btn btn-primary 'onClick={()=>requestEdit()}>Editar</button> {"  "}
                    <button id='btn-cancel' className='btn btn-danger' onClick={()=>openCloseModalEdit()}>Cancelar</button>    
                </ModalFooter>
            </Modal>

            <Modal isOpen={modalDelete}>
                <ModalBody>
                    Esta ação vai eliminar o autor: <br />
                    Nome: {authorSelected && authorSelected.name} <br />
                    País: {authorSelected && authorSelected.country} <br />
                    <b>Deseja continuar?</b>
                </ModalBody>
                <ModalFooter>
                    <button className='btn btn-danger' onClick={()=>requestDelete()}>Eliminar</button>
                    <button className='btn btn-secondary' onClick={()=>openCloseModalDelete()}>Cancelar</button>
                </ModalFooter>
            </Modal>

        </div>
    )
}