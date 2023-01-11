import React, { useState } from "react";
import { AiOutlineUser } from "react-icons/ai";
import { BiImageAdd } from "react-icons/bi";
import { Link, useNavigate } from "react-router-dom";
import { Collapse } from "reactstrap";
import api from "../../services/api";
import "../books/styles.css"
import Toast from "../global/Toast";

export function AddAuthor(){

    
    const [isOpen, setIsOpen] = useState(false);
    const toggle = () => setIsOpen(!isOpen);
    const navigate = useNavigate();
    const [newAuthor,setNewAuthor]= useState({
        name: '',
        country:'',
        image:""
    });

    const handleChange = (e: any) => {
        const {name, value} = e.target;
        setNewAuthor({
          ...newAuthor,[name]:value
        });
      }

      //PEDIDO API 
    const requestCreate = async() => {
        console.log(newAuthor)
        if(newAuthor.name=="" || newAuthor.country=="" ){
            Toast.Show("error","Prencha todos os campos para inserir um autor")
        }
        else{
            await api.post('api/Authors/create', newAuthor)
            .then(response => {
              if(response.data.success == false){
                Toast.Show("error",response.data.message)
                console.log(response.data)
              }else{
                Toast.Show("success",response.data.message)
                navigate(-1);
                //redirect('/books',)
              }
              
            })
          .catch(error =>{
              Toast.Show("error",error)
              console.log(error);
            });
        }  
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
                        <Link className="btn btn-danger m-2" to='/books'>Cancelar</Link>
                    
                    </div>
                </div>
           </div>

        </div>
    )
}