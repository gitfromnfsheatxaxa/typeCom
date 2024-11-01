import React, { useState } from 'react';
import axios from 'axios';

const RegisterCom = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    const handleRegister = async (event) => {
        event.preventDefault();
        setError('');
        setSuccessMessage('');

        if (password.length < 8) {
            setError('The password should be at least 8 characters.');
            return;
        }

        try {
            const response = await axios.post(
                'https://ulugbek5800.pythonanywhere.com/api/signup',
                { username, password },
                { headers: { 'Content-Type': 'application/json' } }
            );
            console.log('Registration successful:', response.data);
            // Clear the input fields
            setUsername('');
            setPassword('');
            // Set success message
            setSuccessMessage('Registration successful! You can now log in.');
        } catch (err) {
            console.error('Registration Error:', err.response?.data || err.message);
            setError(err.response?.data?.message || 'Registration failed. Please check your input.');
        }
    };

    return (
        <div>
            <h2>Register</h2>
            <form className="form-flex" onSubmit={handleRegister}>
                <input
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                />
                <input
                    type="password"
                    placeholder="Password at least 8 characters. "
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />

                <button type="submit">Register</button>
            </form>
            {error && <p className="error-message">{error}</p>}
            {successMessage && <p className="success-message">{successMessage}</p>}
        </div>
    );
};

export default RegisterCom;
