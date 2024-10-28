import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
    const token = localStorage.getItem('token'); // Get token from local storage

    // Check if the user is authenticated
    if (!token) {
        return <Navigate to="/login" replace />; // Redirect to login if not authenticated
    }

    return children; // Render the child components if authenticated
};

export default ProtectedRoute;
