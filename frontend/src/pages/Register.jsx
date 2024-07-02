import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Assuming you are using React Router for navigation
import '../styles/Login.css';
import Auth from '../crud/Auth';

export default function Register() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await Auth.register(email, password);
      alert("Successfully Registered");
      navigate('/login', { replace: true }); // Navigate to the login page after registration
    } catch (err) {
      console.log(err);
      setError('Registration failed. Please try again.');
    }
  };

  return (
    <div>
      <div className="login-page">
        <div className="login-container">
          <div className="wrapper">
            <h2>Register</h2>
            <p className="note">Please, enter your registration details below.</p>
            <form onSubmit={handleRegister}>
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <br />
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <br />
              <button type="submit">Register</button>
            </form>
            {error && <p className="error">{error}</p>}
            <p className="forgot">Already have an account? <a href="/login">Log in</a></p>
          </div>
        </div>
        <div className="image"></div>
      </div>
    </div>
  );
}
