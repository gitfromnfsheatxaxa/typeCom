import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const LogInCom = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (event) => {
        event.preventDefault();
        setError('');

        try {
            // Sending login request to the server
            const response = await axios.post('https://ulugbek5800.pythonanywhere.com/api/login', {
                username,
                password,
            });

            console.log('Login successful:', response.data); // Log the full response data

            // Access the access_token from the response
            const { access_token, message, username: responseUsername } = response.data;

            // Check if the access_token is valid before storing
            if (access_token) {
                localStorage.setItem('access_token', access_token);
                localStorage.setItem('username', username );

                navigate('/profile');
            } else {
                console.error('Access token is undefined'); // Log if the token is not present
                setError('Login failed. Please check your credentials.');
            }
        } catch (err) {
            console.error('Login Error:', err.response ? err.response.data : err.message);
            setError('Login failed. Please check your credentials.'); // Display error message
        }
    };

    return (
        <div>
            <h2>Login</h2>
            <form className="form-flex" onSubmit={handleLogin}>

                <input
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <button type="submit">Login</button>
            </form>
            {error && <p>{error}</p>} {/* Show error message if login fails */}
        </div>
    );
};

export default LogInCom;