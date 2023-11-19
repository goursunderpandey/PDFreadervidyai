import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import axios from 'axios';

function Signup() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [token, setToken] = useState('');

  const handleSignup = async () => {
    try {
      await axios.post('http://localhost:5000/signup', { username, password });
      console.log('User signed up successfully');
      alert("User signed up successfully");
    } catch (error) {
      console.error('Error signing up:', error.response.data.error);
      alert("Error signing up");
    }
  };

  return (
    <div className="container mt-5">
      <div className="card">
        <div className="card-body">
          <h2 className="card-title text-center mb-4">Signup</h2>
          <form>
            <div className="mb-3">
              <label htmlFor="username" className="form-label">Username</label>
              <input
                type="text"
                className="form-control"
                id="username"
                placeholder="Enter your username"
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="password" className="form-label">Password</label>
              <input
                type="password"
                className="form-control"
                id="password"
                placeholder="Enter your password"
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <NavLink className="btn btn-outline-success m-2" type="submit" to="/login" onClick={handleSignup}>
              Signup
            </NavLink>
          </form>
        </div>
      </div>

      {token && (
        <div className="mt-3 alert alert-success" role="alert">
          Token: {token}
        </div>
      )}
    </div>
  );
}

export default Signup;
