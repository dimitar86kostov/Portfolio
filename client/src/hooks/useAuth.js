import { login, logout, register } from "../api/auth-api";
import { useAuthContext } from "../contexts/AuthContext";

export function useLogin() {
    const { changeAuthState } = useAuthContext();

    const loginHandler = async (email, password) => {

        const { password: _, ...authData } = await login(email, password);
        
        changeAuthState(authData);

        return authData;
    }

    return loginHandler
}

export function useRegister() {
    const { changeAuthState } = useAuthContext();

    const registerHandler = async (email, password) => {

        const { password: _, ...authData } = await register(email, password);
        
        changeAuthState(authData);

        return authData;
    }

    return registerHandler
}

export function useLogout() {
    const { logout: localLogout } = useAuthContext();

    const logoutHandler = async () => {
        // Изчистваме само auth-related информация
        localStorage.removeItem('auth'); 
        localLogout();
    };

    return logoutHandler;
}
