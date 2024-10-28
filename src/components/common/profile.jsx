import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Logout from './LogOutCom.jsx'; // Import the Logout component

const Profile = () => {
    const [userData, setUserData] = useState(null);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const nickname = localStorage.getItem('nickname');
        if (!nickname) {
            navigate('/login'); // Redirect to login if nickname is not found
            return;
        }

        // Mock user data for demonstration purposes
        const mockUserData = {
            nickname: nickname,
            created: new Date().toISOString(),
            updated: new Date().toISOString(),
        };

        setUserData(mockUserData); // Set mock user data
    }, [navigate]);
    console.log(userData)
    return (
        <div>
            <h2>User Profile</h2>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            {userData ? (
                <div>
                    <p><strong>Nickname:</strong> {userData.nickname}</p>
                    <p><strong>Created At:</strong> {new Date(userData.created).toLocaleString()}</p>

                        <div>
                            <p>Logout</p>
                            <Logout/>
                        </div>
                </div>
            ) : (
                <p>Loading user data...</p>
            )}
        </div>
    );
};

export default Profile;
