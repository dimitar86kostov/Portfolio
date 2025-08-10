import { useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuthContext } from '../../contexts/AuthContext';

export default function Logout() {
    const { logout } = useAuthContext();

    useEffect(() => {
        logout();
    }, []);

    return <Navigate to="/login" replace />;
}
