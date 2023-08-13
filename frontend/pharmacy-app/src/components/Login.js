import React, { useState } from 'react';
import {Link, useNavigate } from 'react-router-dom'
import axios from 'axios';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const response = await axios.post('http://localhost:5000/login', {
        username: username,
        password: password
      });
      
      if(response.status === 200){
        navigate('/home');
      }

      // Handle successful login response here
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
