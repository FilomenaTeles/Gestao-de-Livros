import React, { useEffect, useState } from 'react';


import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios'; 

export function AllBooks(){
    const baseUrl = "https://localhost:7124/api/Books";
  const [data, setData]= useState([]);

  const requestGet = async()=>{
    await axios.get(baseUrl)
    .then(response => {
      setData(response.data);
    }).catch(error =>{
      console.log(error);
    })
  }
  useEffect(()=>{
    requestGet();
  })

  return (
    
      <table className='table table-bordered'>
        <thead>
          <tr>
            <th>Id</th>
            <th scope="col">Nome</th>
            <th scope="col">Email</th>
            <th scope="col">Idade</th>
            <th scope="col">Ação</th>
          </tr>
        </thead>
        <tbody>
          {data.map((book: {id:number; isbn: number;name:string; author:string; price: number}) =>(
            <tr key={book.id}>
              <td>{book.isbn}</td>
              <td>{book.name}</td>
              <td>{book.author}</td>
              <td>{book.price}€</td>
              <td>
                <button id='btn-edit' className='btn btn-primary'>Editar</button> {"  "}
                <button id='btn-delete' className='btn btn-danger'>Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
  );
}