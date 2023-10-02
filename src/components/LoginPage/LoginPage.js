import { Box } from "@mui/material";
import SpinnerOfDoom from "../HomePage/SpinnerOfDoom";
import React, { useState } from 'react';
import { useSignIn } from "react-auth-kit";
import { useNavigate } from "react-router-dom";

function LoginPage(props) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const signIn = useSignIn();
  const navigate = useNavigate();

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const basicAuth = btoa(`${username}:${password}`);

      const response = await fetch('http://localhost:3000/api/v1/api-keys', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Basic ${basicAuth}`,
        }
      });

      const information = await response.json();
      console.log(information);

      // Check if the API response contains the user's ID
      if (information.id) {
        localStorage.setItem('UserId', information.id);
      }

      signIn({
        token: information.token,
        expiresIn: 3600,
        tokenType: "Bearer",
        authState: { email: username }
      });

      localStorage.setItem('token', information.token);
      localStorage.setItem('email', username);
      navigate('/');
    } catch (error) {
      console.error('Error during login:', error);
    }
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={handleUsernameChange}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={handlePasswordChange}
          required
        />
        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default LoginPage;


