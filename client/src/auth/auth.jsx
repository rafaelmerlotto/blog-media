import { createContext, useContext, useState } from "react";
import { authService } from "../services";


export const authContext = createContext({
    login: async () => { return false },
    logout: () => { },
    token: undefined
})


export const AuthProvider = ({ children }) => {
    const [token, setToken] = useState()
    const login = async (email, password) => {
        const res = await authService.login(email, password);
        if (!res) {
           return false
        }
        return setToken(authService.iToken)
    }
    const logout = () => setToken(undefined);
    return <authContext.Provider value={{login,logout , token,  }}>{children}</authContext.Provider>;
}

export const useAuth = () => {
    return useContext(authContext)
}