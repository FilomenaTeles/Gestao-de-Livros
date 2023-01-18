import React, { useState } from "react";
import { AiOutlineUser } from "react-icons/ai";
import { BiImageAdd } from "react-icons/bi";
import { Link, useNavigate } from "react-router-dom";
import { Collapse } from "reactstrap";
import api from "../../services/APIService";
import "../books/styles.css"
import Toast from "../../helpers/Toast";
import { CreateAuthorDTO, CreateAuthorDTOSchema } from "../../models/Authors/CreateAuthorDTO";
import { AuthorService } from "../../services/AuthorService";

export function AddAuthor(){

    
    const [isOpen, setIsOpen] = useState(false);
    const toggle = () => setIsOpen(!isOpen);

    const service = new AuthorService;
    
    const navigate = useNavigate();
    const [newAuthor,setNewAuthor]= useState<CreateAuthorDTO>(new CreateAuthorDTO());

    const handleChange = (e: any) => {
        const {name, value} = e.target;
        setNewAuthor({
          ...newAuthor,[name]:value
        });
      }

      //PEDIDO API 
    const requestCreate = async() => {
    
        var responseValidate = CreateAuthorDTOSchema.validate(newAuthor,{
          allowUnknown: true,
          })
          if(responseValidate.error != null){
            var message = responseValidate.error!.message;
            Toast.Show("error",message);
            return
          }
    
        var response = await service.Create(newAuthor);
          if(response.success!=true){
            Toast.Show("error",response.message);
            return;
          }
    
        Toast.Show("success",response.message);
        navigate(-1)
    }
    
    return(
        <div className="add-container">
            <div className="container p-3 mt-5">
                <h3 className="text-center"><AiOutlineUser size={55}/> Adicionar novo Autor</h3>
                <div className="container row">
                    <div className="container col-6">
                        <input className="form-control m-3" type="text" placeholder="Nome" name="name" required onChange={handleChange} />   
                        <input className="form-control m-3"  type="text" placeholder="País" name="country" required onChange={handleChange}/>
                            
                        <React.StrictMode>
                            <button className='btn' onClick={toggle}><BiImageAdd size={25}/> Associar Imagem</button>
                            <Collapse isOpen={isOpen} >
                                <input type="url" pattern="https://.*"  className='form-control m-3' placeholder="Associar o link da imagem"  name='image'  onChange={handleChange} />
                                <span className="validity"></span>
                            </Collapse>
                        </React.StrictMode>
                        <br />
                        <button className="btn btn-success ms-3" onClick={requestCreate} >Adicionar</button>
                        <Link className="btn btn-danger m-2" to='/authors'>Cancelar</Link>
                    
                    </div>
                </div>
           </div>

        </div>
    )
}