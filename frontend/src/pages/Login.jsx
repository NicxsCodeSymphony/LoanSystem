import { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Assuming you are using React Router for navigation
import '../styles/Login.css';
import Auth from '../crud/Auth';

export default function Login() {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await Auth.login(username, password);
      alert("Successfully Logged in");
      window.location.href = "/client"
    } catch (err) {
      console.log(err);
      setError('Invalid username or password');
    }
  };

  return (
    <div>
      <div className="login-page">
        <div className="login-container">
          <div className="wrapper">
            <h2>Log in</h2>
            <p className="note">Please, enter your login details below.</p>
            <form onSubmit={handleLogin}>
              <input
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
              <br />
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <br />
              <button type="submit">Log in</button>
            </form>
            {error && <p className="error">{error}</p>}
            <p className="forgot">Forgot Password?</p>
          </div>
        </div>
        <div className="image"></div>
      </div>
    </div>
  );
}
