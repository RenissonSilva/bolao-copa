import { createContext, ReactNode } from "react";
interface UserProps {
    name: string;
    avatarUrl: string;
}
interface AuthProviderProps {
    children: ReactNode;
}

export interface AuthContextDataProps {
    user: UserProps;
    signIn: () => Promise<void>
}

export const AuthContext = createContext({

} as AuthContextDataProps);

export function AuthContextProvider({ children }) {
    async function signIn() {
        console.log("Signing in...");
    }

    return (
        <AuthContext.Provider value={{
            user: {
                name: "Renisson Silva",
                avatarUrl: "https://github.com/renissonsilva.png"
            },
            signIn
        }}>
            { children }    
        </AuthContext.Provider>
    );
}