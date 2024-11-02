import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FaCrown } from 'react-icons/fa';

const ProfilePage = () => {
    const [userData, setUserData] = useState(null);
    const [error, setError] = useState("");
    const token = localStorage.getItem('access_token');

    useEffect(() => {
        fetchUserData();
    }, []);

    const fetchUserData = async () => {
        try {
            const response = await axios.get('https://ulugbek5800.pythonanywhere.com/api/profile', {
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            });
            const user = response.data.profile;
            setUserData(user);
        } catch (err) {
            setError("Failed to load user data.");
        }
    };

    return (
        <div className="profile-container">
            <h2 className="profile-title">Your Profile Data</h2>

            {error && <p className="error-message">{error}</p>}

            {userData ? (
                <div className="table-container">
                    <div className="table-header">Username</div>
                    <div className="table-cell table-header">
                        <FaCrown style={{color: 'gold', marginRight: '5px'}}/>
                        {userData.username}
                    </div>
                    <div className="table-header">Highest WPM (Normal)</div>
                    <div className="table-header">Highest WPM (Hard)</div>
                    <div className="table-row">

                        <div
                            className="table-cell">{userData.highest_wpw_normal !== undefined ? userData.highest_wpw_normal : 'N/A'} WPM</div>
                        <div
                            className="table-cell">{userData.highest_wpm_hard !== undefined ? userData.highest_wpm_hard : 'N/A'} WPM</div>
                    </div>
                </div>
            ) : (
                <p className="loading-message">Loading...</p>
            )}
        </div>
    );
};

export default ProfilePage;
