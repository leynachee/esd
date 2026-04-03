import { Navigate } from 'react-router-dom';
import { isAuthenticated, getCurrentUser } from '../utils/mockAuth';

// ProtectedRoute - requires user to be logged in
const ProtectedRoute = ({ children }) => {
    if (!isAuthenticated()) {
        // Redirect to login if not authenticated
        return <Navigate to="/auth" replace />;
    }

    return children;
};

// RoleProtectedRoute - requires specific role
export const RoleProtectedRoute = ({ children, requiredRole }) => {
    if (!isAuthenticated()) {
        return <Navigate to="/login" replace />;
    }

    const user = getCurrentUser();
    if (user.role !== requiredRole) {
        // Redirect to dashboard if wrong role
        return <Navigate to="/dashboard" replace />;
    }

    return children;
};

// PublicOnlyRoute - redirects to dashboard if already logged in
export const PublicOnlyRoute = ({ children }) => {
    if (isAuthenticated()) {
        return <Navigate to="/dashboard" replace />;
    }

    return children;
};

export default ProtectedRoute;