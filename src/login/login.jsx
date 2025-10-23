import React, { useState } from 'react';

export function Login() {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault(); // Prevents page reload
    console.log('Login submitted:', { email, username, password });
    // Later you'll send this to your backend
  };

  return (
    <main>
      <img src="dice.png" width="335" height="316" alt="dice" />
      <section>
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
                placeholder="Your Email Here   " 
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
                placeholder="Your Name Here   " 
                required 
                style={{color: 'rgb(255,0,0)'}} 
              />
            </li>
            <li>
              <label htmlFor="password">Password:    </label>
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
          <button type="submit">Login</button>
        </form>
      </section>
    </main>
  );
}