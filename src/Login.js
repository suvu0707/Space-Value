import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './App.css';
import PropTypes from 'prop-types';

/**
 * Login component for user authentication.
 * @param {Object} props - Component props.
 * @param {Function} props.setLoggedIn - Function to set the login status.
 */

const Login = ({ setLoggedIn }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleLogin = () => {
        if (username === 'demo' && password === 'password') {
            setLoggedIn(true);
            localStorage.setItem('username', username);
            navigate('/dashboard');
        } else {
            alert('Invalid credentials. Please try again.');
        }
    };

    return (
        <div data-testid="login-page" className="container">
            <div className="login-container">
                <h2>Login</h2>
                <form className="login-form">
                    <label>
                        Username:
                        <input
                            data-testid="username-input"
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
                            data-testid="password-input"
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

Login.propTypes = {
    setLoggedIn: PropTypes.func.isRequired,
};

export default Login;


