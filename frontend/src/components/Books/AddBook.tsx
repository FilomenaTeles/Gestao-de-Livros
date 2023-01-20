import api from "../../services/APIService";
import "./styles.css"
import {BsBook} from "react-icons/bs";
import { Link, useNavigate} from "react-router-dom";
import {useEffect, useState } from "react";
import Toast from "../../helpers/Toast";
import 'react-toastify/dist/ReactToastify.css';
import React from "react";
import { Collapse } from "reactstrap";
import { BiImageAdd } from "react-icons/bi";
import { AiOutlineUserAdd } from "react-icons/ai";
import { CreateBookDTO, CreateBookDTOSchema } from "../../models/Books/CreateBookDTO";
import { BookService } from "../../services/BookService";
import { AuthorsSelect } from "../global/AuthorsDropdown";


export function AddBook(){

  const service = new BookService();

  const navigate = useNavigate();
  const [addBook, setAddBook]= useState<CreateBookDTO>(new CreateBookDTO);

  const handleChange = (e: any) => {
    const {name, value} = e.target;
    setAddBook({
      ...addBook,[name]:value
    });
  }
  
  const requestCreate = async() => {
    
    var responseValidate = CreateBookDTOSchema.validate(addBook,{
      allowUnknown: true,
      })
      if(responseValidate.error != null){
        var message = responseValidate.error!.message;
        Toast.Show("error",message);
        return
      }

    var response = await service.Create(addBook);
      if(response.success!=true){
        Toast.Show("error",response.message);
        return;
      }

    Toast.Show("success",response.message);
    navigate(-1)
  }

  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);


    return(
        <div className="add-container">
           <div className="container p-3 mt-5">
            <h3 className="text-center"><BsBook size={55}/> Adicionar novo Livro</h3>
            <div className="container row">
                <div className="container col-6">
                    
                        <input className="form-control m-3" type="text" placeholder="Nome" name="name" required onChange={handleChange} />
                        <AuthorsSelect 
                        onChange={handleChange}
                        />
                        
                        <input className="form-control m-3"  type="number" placeholder="ISBN" name="isbn" required onChange={handleChange}/>
                        <input className="form-control m-3"  type="number" placeholder="Preço" name="price" min={0} required onChange={handleChange}/>
                        
                        <React.StrictMode>
                            <button className='btn' onClick={toggle}><BiImageAdd size={25}/> Associar Imagem</button>
                            <Collapse isOpen={isOpen} >
                                <input type="url" pattern="https://.*"  className='form-control m-3' placeholder="Associar o link da imagem"  name='image'  onChange={handleChange} />
                                <span className="validity"></span>
                            </Collapse>
                        </React.StrictMode>
                       
                        <Link to='/addauthor' className="btn"><AiOutlineUserAdd size={25}/> Novo Autor</Link>
                    <br />
                        <button className="btn btn-success ms-3" onClick={requestCreate} >Adicionar</button>
                        <Link className="btn btn-danger m-2" to='/books'>Cancelar</Link>
                
                   
                </div>
            </div>
           </div>
        </div>

    );
}