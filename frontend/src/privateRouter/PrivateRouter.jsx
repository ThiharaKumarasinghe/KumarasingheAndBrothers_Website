import React, { useContext } from 'react';
import { AuthContext } from '../contexts/AuthProvider';
import { Navigate, useLocation } from 'react-router-dom';
import LoadingSpinner from '../components/LoadingSpinner';

const PrivateRouter = ({ children }) => {
    const { user, loading } = useContext(AuthContext);
    const location = useLocation();
    
    // Return the loading spinner if still loading
    if (loading) {
        return <LoadingSpinner />;
    }

    // If user is authenticated, return the children
    if (user) {
        return <>{children}</>;
    }

    // If not authenticated, redirect to signup
    return (
        <Navigate to="/signup" state={{ from: location }} replace />
    );
};

export default PrivateRouter;
