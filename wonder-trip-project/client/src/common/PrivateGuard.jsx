import { useAuthContext } from "../contexts/AuthContext";
import { Navigate, Outlet } from 'react-router-dom'

export default function PrivateGuard() {
    const { isAuthenticated } = useAuthContext()

    return isAuthenticated
        ? <Outlet />
        : <Navigate to="/login" />

}