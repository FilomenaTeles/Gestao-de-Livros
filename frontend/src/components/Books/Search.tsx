import { useEffect, useState } from 'react';

import api from '../../services/api';

export function SearchBook(){
    const [books, setBooks]= useState([]);
    const [searchInput, setSearchInput]=useState('');

    useEffect(()=>{
      api.get('api/Books/GetBooksByIsbn').then(response => {
        setBooks(response.data);
      }).catch(error =>{
        console.log(error);
      })
    });

    return(
        <div className="container">
            <form className="mt-3 text-end">
                <input type="text" placeholder="ISBN" />
                <button type="button" className="btn btn-outline-secondary ms-2">Filtrar</button>   
            </form>
        </div>
    );
}