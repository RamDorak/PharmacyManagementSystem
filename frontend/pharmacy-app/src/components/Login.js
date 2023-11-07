import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'
import axios from 'axios';
import { useStateContext } from './StateContext';
import '../styles/Login.css';
import Swal from 'sweetalert2';

// Implement login functionality
function Login({ updateLoginStatus  }) {
  const { state, setState } = useStateContext();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [ isLoggedIn, setIsLoggedIn ] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const response = await axios.post('http://127.0.0.1:5000/login', {
        username: username,
        password: password
      });

      if(response.status === 200){
        Swal.fire (
          'Welcome',
          '',
          'success'
          )
          updateLoginStatus(true);
          const rolep = response.data.role
          const pharmacyName = response.data.pharmacy
          setState({pharmacy: pharmacyName, role: rolep});
          console.log(pharmacyName)
          console.log(rolep)
        }

        if(response.data.role === 'Admin'){
          navigate('/admin-dashboard')
          Swal.fire (
            'Welcome Admin',
            '',
            'success'
          )
        }
      console.log('Login Successful', response.data);
    }
    catch (error) {
      Swal.fire (
        'Invalid username or password',
        '',
        'error'
      )
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
    <div className='login-container'>
      <h2 className='login-heading'>Login</h2>
      <input
        className='login-input'
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <br/>
      <input
        className='login-input'
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <br/>
      <button className='login-button' onClick={handleLogin}>Login</button>
    </div>
  );
}

export default Login;
