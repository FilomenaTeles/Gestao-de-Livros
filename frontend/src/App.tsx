import React, { useEffect, useState } from 'react';
import './App.css';

import 'bootstrap/dist/css/bootstrap.min.css';

import axios from 'axios'; 
import { Link } from 'react-router-dom';

import {Main} from './Main';


function App() {
  
  
  return (

    <div>
      <nav className="navbar navbar-expand-lg bg-light">
        <div className="container-fluid">
          <Link className='navbar-brand' to='/'>Inicio</Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav">
              <li className="nav-item">
                <Link className='nav-link' to='/books'>Livros</Link>
              </li>
              <li className="nav-item">
                <Link className='nav-link' to='/authors'>Autores</Link>
              </li>
            </ul>
          
          </div>
        </div>
      </nav>

      <Main/>
  
    </div>
  );
}

export default App;
