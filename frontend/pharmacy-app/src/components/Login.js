import React, { useState } from 'react';
import {Link, useNavigate } from 'react-router-dom'
import axios from 'axios';
import App from '../App';
import { useStateContext } from './StateContext';

// Implement login functionality
function Login({ updateLoginStatus  }) {
  const { state, setState } = useStateContext();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [ isLoggedIn, setIsLoggedIn ] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const response = await axios.post('http://localhost:5000/login', {
        username: username,
        password: password
      });

      if(response.data.role === 'Admin'){
        navigate('/admin-dashboard')
      }
      
      if(response.status === 200){
        updateLoginStatus(true);
        const rolep = response.data.role
        const pharmacyName = response.data.pharmacy
        setState({pharmacy: pharmacyName, role: rolep});
        console.log(pharmacyName)
        console.log(rolep)
      }
      console.log('Login Successful', response.data);
    }
    catch (error) {
        if (error.response && error.response.status === 401) {
          setLoginError('Invalid username or password');
        } else {
          setLoginError('An error occurred during login');
        }
    }
  };

function setLoginError(error){
    console.log(error);
}

  return (
    <div>
      <h2>Login</h2>
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleLogin}>Login</button>
    </div>
  );
}

export default Login;
