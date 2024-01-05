import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './App.css'; 

const Login = ({ setLoggedIn }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = () => {
    // Simple hardcoded login functionality for demonstration purposes
    if (username === 'demo' && password === 'password') {
      setLoggedIn(true);
      localStorage.setItem('username', username); // Store the username in localStorage
      navigate('/dashboard');
    } else {
      alert('Invalid credentials. Please try again.');
    }
  };

  return (
    <div className="container">
      <div className="login-container">
        <h2>Login</h2>
        <form className="login-form">
          <label>
            Username:
            <input
              className="login-input"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </label>
          <br />
          <label>
            Password:
            <input
              className="login-input"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </label>
          <br />
          <button className="login-button" type="button" onClick={handleLogin}>
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;


