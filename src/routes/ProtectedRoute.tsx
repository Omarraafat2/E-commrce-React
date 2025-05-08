import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectAuth } from '../features/auth/authSlice';

interface ProtectedRouteProps {
    children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
    const { token } = useSelector(selectAuth);
    return token ? <>{children}</> : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
