import React, { useState } from "react";
import { NavLink, Route, Routes } from 'react-router-dom';
import { Login } from './login/login';
import { Play } from './play/play';
import { Homepage } from './homepage/homepage';
import { Leaderboard } from './leaderboard/leaderboard';

export default function App() {
  const [authState, setAuthState] = useState(false);
  const [username, setUsername] = useState('');

  const handleLogin = (user) => {
    setAuthState(true);
    setUsername(user);
  };

  const handleLogout = () => {
    setAuthState(false);
    setUsername('');
  };

  return (
    <div className="body bg-dark text-light">
      <header className="container-fluid">
        <nav className="navbar fixed-top navbar-dark bg-dark" style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '10px 20px'
        }}>
          <div className="navbar-brand">
            Qwixx Online {username && `- Welcome, ${username}!`}
          </div>
          <menu style={{
            display: 'flex',
            flexDirection: 'row',
            listStyle: 'none',
            margin: 0,
            padding: 0,
            gap: '20px'
          }}>
            <li className="nav-item">
              <NavLink className="nav-link" to="/">
                Homepage
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/play">
                Play
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/leaderboard">
                Leaderboard
              </NavLink>
            </li>
            <li className="nav-item">
              {authState ? (
                <button 
                  className="nav-link btn btn-link" 
                  onClick={handleLogout}
                  style={{border: 'none', background: 'none'}}
                >
                  Logout
                </button>
              ) : (
                <NavLink className="nav-link" to="/login">
                  Login
                </NavLink>
              )}
            </li>
          </menu>
        </nav>
      </header>

      <main style={{
        marginTop: '80px',
        padding: '20px',
        minHeight: 'calc(100vh - 160px)'
      }}>
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/play" element={<Play username={username} authState={authState} />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
          <Route path="/login" element={<Login onLogin={handleLogin} />} />
        </Routes>
      </main>

      <footer className="bg-dark text-white-50" style={{padding: '20px'}}>
        <div className="container-fluid">
          <span className="text-reset">Isaac Hales </span>
          <a className="text-reset" href="https://github.com/isaac-hales/StartUp">
             Github Repository
          </a>
        </div>
      </footer>
    </div>
  );
}