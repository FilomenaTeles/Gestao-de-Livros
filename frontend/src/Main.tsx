import { Routes, Route } from 'react-router-dom';

import { Books } from './pages/Books';
import { Home } from './pages/Home';
import { AddBook } from './components/books/AddBook';
import { NotFoundPage } from './pages/NotFoundPage';

export function Main(){
    return(
        <Routes>
            <Route path='/' element={<Home/>}></Route>
            <Route path='/books' element={<Books/>}></Route>
            <Route path='/addbook' element={<AddBook/>}></Route>
            <Route path="*" element={<NotFoundPage/>}></Route>
        </Routes>
    );
}