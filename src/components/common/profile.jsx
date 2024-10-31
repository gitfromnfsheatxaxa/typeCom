// Profile.jsx
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Logout from './LogOutCom.jsx'; // Import the Logout component

const Profile = () => {
    const [userData, setUserData] = useState(null);
    const [error, setError] = useState(null);
    const [imageUrl, setImageUrl] = useState(''); // State to hold image URL
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
            imageUrl: 'path/to/default-profile-image.png', // Default image path
        };

        setUserData(mockUserData); // Set mock user data
        setImageUrl(mockUserData.imageUrl); // Set default image URL
    }, [navigate]);

    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImageUrl(reader.result); // Update image URL with the uploaded image
            };
            reader.readAsDataURL(file); // Read the file as a data URL
        }
    };

    const handleUrlSubmit = (e) => {
        e.preventDefault();
        const url = e.target.url.value;
        setImageUrl(url); // Set the image URL from the text input
        e.target.url.value = ''; // Clear the input after submission
    };

    const handleImageDownload = () => {
        const link = document.createElement('a');
        link.href = imageUrl; // Use the user's image URL
        link.download = `${userData.nickname}-profile.png`; // Name the downloaded file
        link.click();
    };

    return (
        <div className="profile-container">
            <h2 className="profile-heading">User Profile</h2>
            {error && <p className="error-message">{error}</p>}
            {userData ? (
                <div className="user-data">
                    <img
                        src={imageUrl}
                        alt={`${userData.nickname}'s profile`}
                        className="profile-image"
                    />
                    <p><strong>Nickname:</strong> {userData.nickname}</p>
                    <p><strong>Created At:</strong> {new Date(userData.created).toLocaleString()}</p>

                    <div className="upload-section">
                        <input
                            type="file"
                            accept="image/*"
                            onChange={handleImageUpload}
                            className="file-input"
                        />
                        <form onSubmit={handleUrlSubmit}>
                            <input
                                type="text"
                                name="url"
                                placeholder="Paste image URL here"
                                className="url-input"
                            />
                            <button type="submit" className="submit-url-button">Submit URL</button>
                        </form>
                    </div>

                    <button className="download-button" onClick={handleImageDownload}>
                        Download Profile Image
                    </button>
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
