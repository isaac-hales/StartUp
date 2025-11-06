import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

// Child component for authenticated users
function Authenticated({ username, onLogout }) {
  return (
    <div>
      <h1>Welcome back, {username}!</h1>
      <p>You are already logged in.</p>
      <button onClick={onLogout} className="btn btn-danger">
        Logout
      </button>
    </div>
  );
}

// Child component for unauthenticated users
function Unauthenticated({ onLogin }) {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    // In a real app, you'd validate credentials here
    onLogin(username); // Notify parent of login
    navigate('/play'); // Redirect to play page
  };

  return (
    <div>
      <img src="dice.png" width="335" height="316" alt="dice" />
      <h1>LOGIN PAGE</h1>
      <form onSubmit={handleSubmit}>
        <ul>
          <li>
            <label htmlFor="email">Email: </label>
            <input 
              type="email" 
              id="email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Your Email Here" 
              required 
              style={{color: 'rgb(255,220,0)'}}
            />
          </li>
          <li>
            <label htmlFor="player-name">User Name: </label>
            <input 
              type="text" 
              id="player-name" 
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Your Name Here" 
              required 
              style={{color: 'rgb(255,0,0)'}} 
            />
          </li>
          <li>
            <label htmlFor="password">Password: </label>
            <input 
              type="password" 
              id="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Your Password Here" 
              required 
              style={{color: 'rgb(50,240,100)'}} 
            />
          </li>
        </ul>
        <button type="submit" className="btn btn-primary">Login</button>
      </form>
    </div>
  );
}

// Main Login component that renders based on auth state
export function Login({ onLogin }) {
  // Check if user is already logged in (you'd get this from props or context)
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentUsername, setCurrentUsername] = useState('');

  const handleLogin = (username) => {
    setIsAuthenticated(true);
    setCurrentUsername(username);
    onLogin(username);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setCurrentUsername('');
  };

  return (
    <main>
      {isAuthenticated ? (
        <Authenticated username={currentUsername} onLogout={handleLogout} />
      ) : (
        <Unauthenticated onLogin={handleLogin} />
      )}
    </main>
  );
}