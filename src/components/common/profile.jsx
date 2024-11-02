import React, { useEffect, useState } from 'react';
import { FaCrown } from 'react-icons/fa';
import DefaultPhoto from '../../assets/img.png'; // Update the path to your default image

const ProfilePage = () => {
    const [userData, setUserData] = useState(null);
    const [error, setError] = useState("");
    const [newImage, setNewImage] = useState(null);
    const [loading, setLoading] = useState(true);
    const token = localStorage.getItem('access_token');

    useEffect(() => {
        if (!token) {
            window.location.href = '/login';
        } else {
            fetchUserProfile();
        }
    }, [token]);

    const fetchUserProfile = async () => {
        setLoading(true);
        try {
            const response = await fetch("https://ulugbek5800.pythonanywhere.com/api/profile", {
                method: "GET",
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            });
            const data = await response.json();
            console.log('Profile Data:', data);

            if (response.ok) {
                setUserData(data.profile);
            } else {
                setError("Error fetching profile: " + data.error);
            }
        } catch (error) {
            setError("Failed to fetch profile: " + error);
        } finally {
            setLoading(false);
        }
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setNewImage(file);
        } else {
            setError("No file selected");
        }
    };

    const uploadImage = async () => {
        if (!newImage) {
            setError("No image selected.");
            return;
        }
        const formData = new FormData();
        formData.append('file', newImage);
        try {
            const response = await fetch('https://ulugbek5800.pythonanywhere.com/api/profile/upload-picture', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
                body: formData,
            });
            if (response.ok) {
                fetchUserProfile(); // Refresh user data after upload
            } else {
                const data = await response.json();
                setError("Failed to upload image: " + data.error);
            }
        } catch (err) {
            setError("Failed to upload image: " + err);
        }
    };

    const deleteImage = async () => {
        try {
            const response = await fetch('https://ulugbek5800.pythonanywhere.com/api/profile/delete-picture', {
                method: 'DELETE',
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            if (response.ok) {
                fetchUserProfile(); // Refresh user data after deletion
            } else {
                const data = await response.json();
                setError("Failed to delete image: " + data.error);
            }
        } catch (err) {
            setError("Failed to delete image: " + err);
        }
    };

    const logout = () => {
        localStorage.removeItem('access_token');
        window.location.href = '/login';
    };

    return (
        <div className="profile-container">
            {error && <p className="error-message">{error}</p>}
            {loading ? (
                <p className="loading-message">Loading...</p>
            ) : userData ? (
                <div className="profile-content">
                    <div className="image-con">
                        <div className="image-div">
                            <img
                                id="profilePicture"
                                src={userData.profile_picture ? `https://ulugbek5800.pythonanywhere.com${userData.profile_picture}` : DefaultPhoto}
                                alt="Profile"
                                className="profile-picture"
                                onError={(e) => {
                                    e.target.onerror = null; // Prevent looping
                                    e.target.src = DefaultPhoto; // Fallback to default image
                                }}
                            />
                            <input type="file" accept="image/*" onChange={handleImageChange} />
                        </div>
                        <div className="image-row">
                            <button className="upload-button" onClick={uploadImage}>Upload Picture</button>
                            <button className="delete-button" onClick={deleteImage}>Delete Picture</button>
                        </div>
                    </div>
                    <div className="username-section" id="username">
                        <FaCrown style={{ color: 'gold', marginRight: '5px' }} />
                        <h2 className="profile-title">{userData.username}</h2>
                    </div>
                    <div className="table-container">
                        <div className="table-header">Highest WPM (Normal)</div>
                        <div className="table-cell">
                            {userData.highest_wpm_normal !== undefined ? userData.highest_wpm_normal : 'N/A'} WPM
                        </div>
                        <div className="table-header">Highest WPM (Hard)</div>
                        <div className="table-cell">
                            {userData.highest_wpm_hard !== undefined ? userData.highest_wpm_hard : 'N/A'} WPM
                        </div>
                        <div className="table-header">Created At</div>
                        <div className="table-cell">
                            {userData.created_at ? new Date(userData.created_at).toLocaleString() : 'N/A'}
                        </div>
                    </div>
                    <button className="logout-button" onClick={logout}>Log Out</button>
                </div>
            ) : (
                <p className="loading-message">Loading...</p>
            )}
        </div>
    );
};

export default ProfilePage;
