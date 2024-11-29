import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import "./login.css";
const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    
  }, [navigate]);

  const handleLogin = async (e) => {
    e.preventDefault();

    const response = await fetch('http://localhost:3005/login', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('user')}`,
      },
      body: JSON.stringify({ username, password }),
    });

    const contentType = response.headers.get('Content-Type');
    let data;
    
    if (contentType && contentType.includes('application/json')) {
      data = await response.json();
    } else {
      const text = await response.text();
      console.log('Response is not JSON:', text);
      alert(text); 
      return;
    }
    console.log(response.ok);
    console.log(data);
    if (response.ok && data.user) {
        localStorage.setItem('user', JSON.stringify(data.user));  
        navigate('/profile');
      } else {
        alert('Login failed: ' + (data.message || 'Invalid credentials'));
      }
  };

  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/login');
  };

  const isLoggedIn = localStorage.getItem('user');

  return (
    <div>
      {isLoggedIn ? (
        <div>
          <h1>You are already logged in. Do you want to log out?</h1>
          <button onClick={handleLogout}>Logout</button>
        </div>
      ) : (
        <div>
          <h1>Login</h1>
          <form onSubmit={handleLogin}>
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button type="submit">Login</button>
          </form>
        </div>
      )}
    </div>
  );
};

export default Login;
