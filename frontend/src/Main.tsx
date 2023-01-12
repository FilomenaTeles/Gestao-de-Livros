import { Routes, Route } from 'react-router-dom';
import { Books } from './pages/Books';
import { Author } from './pages/Authores';
import { Home } from './pages/Home';
import { AddBook } from './components/books/AddBook';
import { NotFoundPage } from './pages/NotFoundPage';
import { AddAuthor } from './components/authors/AddAuthor';

export function Main(){
    return(
        <Routes>
            <Route path='/' element={<Home/>}></Route>
            <Route path='/books' element={<Books/>}></Route>
            <Route path='/addbook' element={<AddBook/>}></Route>
            <Route path='/authors' element={<Author/>}></Route>
            <Route path='/addauthor' element={<AddAuthor/>}></Route>
            <Route path="*" element={<NotFoundPage/>}></Route>
        </Routes>
    );
}