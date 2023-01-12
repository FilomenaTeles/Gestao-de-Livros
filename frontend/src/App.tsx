import {useState } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom';
import {Main} from './Main';
import { ToastContainer } from 'react-toastify';


function App() {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);
  
  return (

    <div>
      <nav className="navbar navbar-expand-lg bg-secondary">
        <div className="container-fluid">
          <Link className='navbar-brand text-light' to='/'>Inicio</Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav">
              <li className="nav-item">
                <Link className='nav-link text-light' to='/books'>Livros</Link>
              </li>
              <li className="nav-item">
                <Link className='nav-link text-light' to='/authors'>Autores</Link>
              </li>
            </ul>
          
          </div>
        </div>
      </nav>

      <Main/>
  
      <ToastContainer />
    </div>
  );
}

export default App;
