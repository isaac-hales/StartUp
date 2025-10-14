import React from "react";
import { BrowserRouter, NavLink, Route, Routes } from 'react-router-dom';
import { Login } from './login/login';
import { Play } from './play/play';
import { Homepage } from './homepage/homepage';

function NotFound() {
  return <main className="container-fluid bg-secondary text-center">404: Return to sender. Address unknown.</main>;
}

export default function App() {
  return (
    <BrowserRouter>
      <div className="body bg-dark text-light">
        <header className="container-fluid">
          <nav className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top">
            <div className="container-fluid">
              <div className="navbar-brand">
                Qwixx Online<sup>&reg;</sup>
              </div>
              <ul className="navbar-nav ms-auto">
                <li className="nav-item">
                  <NavLink className="nav-link" to="/about">
                    Homepage
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link" to="/play">
                    Play
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link" to="/">
                  Login 
                  </NavLink>
                </li>
              </ul>
            </div>
          </nav>
        </header>

        <Routes>
          <Route path='/' element={<Login />} />
          <Route path='/play' element={<Play />} />
          <Route path='/about' element={<Homepage />} />
          <Route path='*' element={<NotFound />} />
        </Routes>

        <footer className="bg-dark text-white-50">
          <div className="container-fluid">
            <span className="text-reset"> Isaac Hales Github: </span>
            <a className="text-reset" href="https://github.com/isaac-hales/StartUp/tree/main">
              All the HTML
            </a>
          </div>
        </footer>
      </div>
    </BrowserRouter>
  );
}