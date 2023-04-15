import { createContext, ReactNode, useState, useEffect } from "react";
import * as Google from 'expo-auth-session/providers/google';
import * as AuthSession from 'expo-auth-session';
import * as WebBrowser from 'expo-web-browser';
import { api } from "../services/api";

WebBrowser.maybeCompleteAuthSession();
interface UserProps {
    name: string;
    avatarUrl: string;
}
interface AuthProviderProps {
    children: ReactNode;
}

export interface AuthContextDataProps {
    user: UserProps;
    signIn: () => Promise<void>,
    isUserLoading: boolean;
}

export const AuthContext = createContext({

} as AuthContextDataProps);

export function AuthContextProvider({ children }) {
    const [user, setUser] = useState<UserProps>({} as UserProps);
    const [isUserLoading, setIsUserLoading] = useState(false);

    const [request, response, promptAsync] = Google.useAuthRequest({
        clientId: '662395933649-0n38feehjjefof2j69rt02f2ajk8l8nd.apps.googleusercontent.com',
        redirectUri: AuthSession.makeRedirectUri({ useProxy: true }),
        scopes: ['profile', 'email']
    })

    async function signIn() {
        try {
            await promptAsync();
            setIsUserLoading(true)
        } catch (error) {
            console.log(error);
            throw error;
        } finally {
            setIsUserLoading(false)
        }
    }

    async function signInWithGoogle(access_token: string) {
        // Falta guardar os dados do usuário
        console.log('try agr', access_token)
        try {
            setIsUserLoading(true)
            const tokenResponse = await api.post('/users', { access_token });
            
            api.defaults.headers.common['Authorization'] =  `Bearer ${tokenResponse.data.token}`

            const userInfoResponse = await api.get('/me')
            setUser(userInfoResponse.data.user)
        } catch (error) {
            console.log(error);
            throw error;
        } finally {
            setIsUserLoading(false)
        }
    }

    useEffect(() => {
        if(response?.type === 'success' && response.authentication?.accessToken) {
            signInWithGoogle(response.authentication.accessToken);
        }
    }, [response])

    return (
        <AuthContext.Provider value={{
            user,
            signIn,
            isUserLoading
        }}>
            { children }    
        </AuthContext.Provider>
    );
}