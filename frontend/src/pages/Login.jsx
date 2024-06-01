import { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Assuming you are using React Router for navigation
import HomeHeading from "../components/homeHeading";
import '../styles/Login.css';

export default function Login() {
    const history = useNavigate();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = () => {
        if (username === 'admin' && password === 'admin') {
            history('/client');
        } else {
            // Handle incorrect credentials
            alert('Invalid username or password');
        }
    };

    return (
        <div>
            <div className="login-page">
                <div className="login-container">
                    <div className="wrapper">
                        <h2>Log in</h2>
                        <p className="note">Please, enter your login details below.</p>
                        <input
                            placeholder="Username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        /> <br />
                        <input
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        /> <br />
                        <button onClick={handleLogin}>Log in</button>

                        <p className="forgot">Forgot Password?</p>
                    </div>
                </div>
                <div className="image"></div>
            </div>
        </div>
    );
}
