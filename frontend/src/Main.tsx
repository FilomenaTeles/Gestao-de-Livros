import { Routes, Route } from 'react-router-dom';

import { Books } from './pages/Books';
import { Home } from './pages/Home';
import { AddBook } from './components/books/AddBook';

export function Main(){
    return(
        <Routes>
            <Route path='/' element={<Home/>}></Route>
            <Route path='/books' element={<Books/>}></Route>
            <Route path='/addbook' element={<AddBook/>}></Route>
        </Routes>
    );
}