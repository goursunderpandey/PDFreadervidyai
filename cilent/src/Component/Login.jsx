import React, { useState } from 'react';
import { useAuth } from './AuthContext';
import { Navigate, NavLink } from 'react-router-dom';
import axios from 'axios';

function Login() {
  const { login } = useAuth();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    if (!username || !password) {
      alert('Please enter both username and password');
      return;
    }

    try {
      const response = await axios.post('http://localhost:5000/login', {
        username,
        password,
      });
      login(response.data);
      console.log('User logged in successfully');
      alert('User logged in successfully');
    } catch (error) {
      console.error('Error logging in:', error.response.data.error);
      alert('Error logging in');
    }
  };

  const { user } = useAuth();

  if (user) {
    return <Navigate to="/" />;
  }

  return (
    <div className="container mt-5">
      <div className="card">
        <div className="card-body">
          <h2 className="card-title text-center mb-4">Login</h2>
          <form>
            <div className="mb-3">
              <label htmlFor="username" className="form-label">
                Username
              </label>
              <input
                type="text"
                className="form-control"
                id="username"
                placeholder="Enter your username"
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="password" className="form-label">
                Password
              </label>
              <input
                type="password"
                className="form-control"
                id="password"
                placeholder="Enter your password"
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <button
              type="button"
              className="btn btn-primary"
              onClick={handleLogin}
            >
              Login
            </button>

            <NavLink className="btn btn-outline-success m-2" type="submit" to="/signup">
              New user Registration
            </NavLink>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
