import React from "react";
import { useEffect, useState } from "react";
import { AiOutlineUserAdd } from "react-icons/ai";
import { BiImageAdd } from "react-icons/bi";
import { BsBook } from "react-icons/bs";
import { Link, useParams } from "react-router-dom"
import { Collapse } from "reactstrap";

import Toast from "../../helpers/Toast";
import { AuthorListDTO } from "../../models/Authors/AuthorListDTO";
import { CreateBookDTO } from "../../models/Books/CreateBookDTO";
import { AuthorService } from "../../services/AuthorService";
import { BookService } from "../../services/BookService";


export function BookDetail(){
    
    const {id} = useParams<{ id: string }>();
   
    const service = new BookService();
    const authorService = new AuthorService;

    const [viewBook, setViewBook]= useState<CreateBookDTO>(new CreateBookDTO());
    const [authors, setAuthors] = useState<AuthorListDTO[]>([]);
    const [isOpen, setIsOpen] = useState(false);
    const toggle = () => setIsOpen(!isOpen);

    useEffect(() => {
        getBook();
        getAuthor();
    }, []);

    const getBook = async () => {
        var response = await service.GetById(parseInt(id!))

        if(response.success !== true){
            Toast.Show("error",response.message)
        }
        setViewBook(response.obj!)
    }
    const getAuthor = async () => {
        var response = await authorService.GetAll(1,1000,null,null)
        if(response.success !== true){
            Toast.Show("error",response.message)
        }
        setAuthors(response.items)
    }
    const handleChange = (e: any) => {
        const {name, value} = e.target;
        setViewBook({
          ...viewBook,[name]:value
        });
      }
   
    
    return(
        <div className="add-container">
        <div className="container p-3 mt-5">
          <h3 className="text-center"><BsBook size={55}/> Detalhes Livro</h3>
         <div className="container row">
             <div className="container col-6">
                 
                     <input className="form-control m-3" type="text" placeholder="Nome" name="name" required value={viewBook.name} onChange={handleChange} />
                     <select className="form-control m-3" name="authorId" id="authorId" onChange={handleChange}>
                         <option disabled selected>Selecione um Autor</option>
                       {authors.map((author: AuthorListDTO) => (
                           <option value={author.id} >{author.name}</option>  
                       ))}
                     </select>
                     <input className="form-control m-3"  type="number" placeholder="ISBN" value={viewBook.isbn}  name="isbn" required onChange={handleChange}/>
                     <input className="form-control m-3"  type="number" placeholder="Preço" value={viewBook.price}  name="price" min={0} required onChange={handleChange}/>
                     
                     <React.StrictMode>
                         <button className='btn' onClick={toggle}><BiImageAdd size={25}/> Associar Imagem</button>
                         <Collapse isOpen={isOpen} >
                             <input type="url" pattern="https://.*"  className='form-control m-3' placeholder="Associar o link da imagem"  name='image'  onChange={handleChange} />
                             <span className="validity"></span>
                         </Collapse>
                     </React.StrictMode>
                    
                     <Link to='/addauthor' className="btn"><AiOutlineUserAdd size={25}/> Novo Autor</Link>
                 <br />
                     {/* <button className="btn btn-success ms-3" onClick={} >Adicionar</button> */}
                     <Link className="btn btn-danger m-2" to='/books'>Cancelar</Link>
             
                
             </div>
         </div> 
        </div>
     </div>

    )
}