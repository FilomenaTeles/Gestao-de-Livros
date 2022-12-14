import { Routes, Route } from 'react-router-dom';

import { Books } from './pages/Books';
import { Home } from './pages/Home';

export function Main(){
    return(
        <Routes>
            <Route path='/' element={<Home/>}></Route>
            <Route path='/books' element={<Books/>}></Route>
        </Routes>
    );
}