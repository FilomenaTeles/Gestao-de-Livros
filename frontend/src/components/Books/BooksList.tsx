import React, { useEffect, useState } from 'react';
import api from '../../services/api';


import 'bootstrap/dist/css/bootstrap.min.css';

export function AllBooks(){
 
  const [books, setBooks]= useState([]);

  useEffect(()=>{
    api.get('api/Books').then(response => {
      setBooks(response.data);
    }).catch(error =>{
      console.log(error);
    })
  });


  return (
    <div className='container mt-4'>
      <table className='table table-bordered'>
        <thead>
          <tr>
            <th>ISBN</th>
            <th scope="col">Nome</th>
            <th scope="col">Email</th>
            <th scope="col">Idade</th>
            <th scope="col">Ação</th>
          </tr>
        </thead>
        <tbody>
          {books.map((book: {id:number; isbn: number;name:string; author:string; price: number}) =>(
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
    </div>
  );
}