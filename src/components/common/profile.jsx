// Profile.jsx
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Logout from './LogOutCom.jsx';

const Profile = () => {
    const [userData, setUserData] = useState(null);
    const [imageUrl, setImageUrl] = useState('');
    const [personalRecords, setPersonalRecords] = useState({
        normal: { wpm: 0, accuracy: 0 },
        hard: { wpm: 0, accuracy: 0 }
    });
    const navigate = useNavigate();

    useEffect(() => {
        const username = localStorage.getItem('username');
        if (!username) {
            navigate('/login');
            return;
        }

        // Mock user data for demonstration purposes
        const mockUserData = {
            username: username,
            created: new Date().toISOString(),
            imageUrl: 'path/to/default-profile-image.png',
        };

        setUserData(mockUserData);
        setImageUrl(mockUserData.imageUrl);

        // Fetch personal records for "Normal" and "Hard" mode
        fetchPersonalRecords(username);
    }, [navigate]);

    const fetchPersonalRecords = async (username) => {
        try {
            const response = await axios.get(`https://ulugbek5800.pythonanywhere.com/api/user-records?username=${username}`);
            setPersonalRecords(response.data);
        } catch (err) {
            console.error("Failed to load personal records:", err);
        }
    };

    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImageUrl(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleImageDownload = () => {
        const link = document.createElement('a');
        link.href = imageUrl;
        link.download = `${userData.username}-profile.png`;
        link.click();
    };

    return (
        <div className="profile-container">
            <h2 className="profile-heading">User Profile</h2>
            {userData ? (
                <div className="user-data">
                    <div className="profile-image-container">
                        <img src={imageUrl} alt="Profile" className="profile-image" />
                        <p className="username">{userData.username}</p>
                        <p className="joined-date">Joined {new Date(userData.created).toLocaleDateString()}</p>
                    </div>

                    <div className="upload-section">
                        <input type="file" accept="image/*" onChange={handleImageUpload} className="file-input" />
                        <button onClick={handleImageDownload} className="download-button">Download Profile Image</button>
                    </div>

                    <h3 className="record-heading">Highest <span className="wpm">WPM</span> <span className="accuracy">Accuracy</span></h3>
                    <div className="records">
                        <div className="record normal">
                            <h4>Normal</h4>
                            <p>{personalRecords.normal.wpm}</p>
                            <p>{personalRecords.normal.accuracy}%</p>
                        </div>
                        <div className="record hard">
                            <h4>Hard</h4>
                            <p>{personalRecords.hard.wpm}</p>
                            <p>{personalRecords.hard.accuracy}%</p>
                        </div>
                    </div>

                    <div className="logout-section">
                        <Logout />
                    </div>
                </div>
            ) : (
                <p>Loading user data...</p>
            )}
        </div>
    );
};

export default Profile;
