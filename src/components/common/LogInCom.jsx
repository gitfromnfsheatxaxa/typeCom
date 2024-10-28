import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const LogInCom = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [nickname, setNickname] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (event) => {
        event.preventDefault();
        setError('');

        try {
            const response = await axios.post('https://ulugbek5800.pythonanywhere.com/api/login', {
                username,
                password,
            });
            console.log('Login successful:', response.data);

            // Assuming response.data contains a 'nickname' and 'created' field
            const { token, nickname: responseNickname, created } = response.data;

            // Save token, nickname, and registration date to local storage
            localStorage.setItem('token', token);
            localStorage.setItem('nickname', nickname || responseNickname); // Set either the typed nickname or response nickname
            localStorage.setItem('registrationDate', created); // Save the registration date

            navigate('/profile');
        } catch (err) {
            console.error('Login Error:', err);
            setError('Login failed. Please check your credentials.');
        }
    };

    return (
        <div>
            <h2>Login</h2>
            <form className="form-flex" onSubmit={handleLogin}>
                <input
                    type="text"
                    placeholder="Nickname"
                    value={nickname}
                    onChange={(e) => setNickname(e.target.value)}
                    required
                />
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
            {error && <p>{error}</p>}
        </div>
    );
};

export default LogInCom;
