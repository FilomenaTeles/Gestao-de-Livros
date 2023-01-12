import api from "../../services/api";
import "./styles.css"

import {BsBook} from "react-icons/bs";
import { Link, useNavigate, redirect} from "react-router-dom";
import { ChangeEvent, useEffect, useState } from "react";

import Toast from "../global/Toast";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import React from "react";
import { Collapse } from "reactstrap";
import { BiImageAdd } from "react-icons/bi";
import { AiOutlineUserAdd } from "react-icons/ai";


export function AddBook(){

    const navigate = useNavigate();
    const [newBook,setNewBook]= useState({
        name: '',
        isbn: 0,
        price: 0.0,
        authorId:0
    });
    const handleChange = (e: any) => {
        const {name, value} = e.target;
        setNewBook({
          ...newBook,[name]:value
        });
        console.log(newBook);
      }

    // <Link to={'/books'}></Link>
    
    // redirect('/books');
  

  const requestCreate = async() => {
    console.log(newBook)
      if(newBook.authorId == 0|| newBook.name=="" || newBook.isbn==0 ){
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
            navigate(-1);
            //redirect('/books',)
          }
          
      }).catch(error =>{
          Toast.Show("error",error)
          console.log(error);
        });
      }
      
   }

  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  //Lista Autores:

const [getAuthors, setGetAuthors] = useState({
  currentPage: 1,
  pageSize: 1000
}
);

const [allAuthors, setAllAuthors]= useState([{
  name: '',
  country:'',
  image:'',
  id:0
}]);

const requestGetAuthors = async() =>{
  //console.log(getBooks)
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
const [updateData, setUpdatedata]= useState(true);

useEffect(()=>{
  if(updateData)
  {
    requestGetAuthors();
    setUpdatedata(false);
  } 
}, [updateData])



    return(
        <div className="add-container">
           <div className="container p-3 mt-5">
            <h3 className="text-center"><BsBook size={55}/> Adicionar novo Livro</h3>
            <div className="container row">
                <div className="container col-6">
                    
                        <input className="form-control m-3" type="text" placeholder="Nome" name="name" required onChange={handleChange} />
                        <select className="form-control m-3" name="authorId" id="authorId" onChange={handleChange}>
                            <option disabled selected>Selecione um Autor</option>
                          {allAuthors.map((author: {name:string; id:number;}) => (
                              <option value={author.id} >{author.name}</option>  
                          ))}
                        </select>
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