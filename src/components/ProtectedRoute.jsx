import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';
import '../index.css'; // We'll create this file next

const ProtectedRoute = ({ children }) => {
    const { isAuthenticated, isLoading } = useAuth0();

    if (isLoading) {
        return (
            <div className="loading-container">
                <div className="loading-content">
                    <div className="loading-logo">
                        <span className="logo-text">Smart<span className="logo-highlight">3</span></span>
                    </div>
                    <div className="loading-spinner-container">
                        <div className="loading-spinner">
                            <div className="spinner-ring"></div>
                            <div className="spinner-ring"></div>
                            <div className="spinner-ring"></div>
                        </div>
                    </div>
                    <p className="loading-text">Loading your experience<span className="dot-animation">...</span></p>
                    <div className="loading-progress">
                        <div className="progress-bar"></div>
                    </div>
                </div>
            </div>
        );
    }

    if (!isAuthenticated) {
        return <Navigate to="/login" />;
    }

    return children;
};

export default ProtectedRoute;