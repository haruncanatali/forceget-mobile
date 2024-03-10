import axios from "axios";
import * as SecureStore from 'expo-secure-store';
import React, { useEffect, useState, createContext, useContext } from 'react';

interface AuthProps {
    authState?: {token: string | null; authenticated: boolean | null};
    onRegister?: (email: string, password: string) => Promise<any>;
    onLogin?: (email: string, password: string) => {};
    onLogout?: () => Promise<any>;
}

const TOKEN_KEY = 'my-jwt'
export const API_URL = 'https://d899-178-233-174-6.ngrok-free.app/api'
const AuthContext = createContext<AuthProps>({})

export const useAuth = () => {
    return useContext(AuthContext)
}

export const AuthProvider = ({  children } : any) => {
    const [authState, setAuthState] = useState<{
        token : string | null;
        authenticated: boolean | null;
    }>({
        token: null,
        authenticated: null
    });

    useEffect(() => {
        const loadToken = async () => {
            const token = await SecureStore.getItemAsync(TOKEN_KEY)
            if(token){
                axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
                setAuthState({
                    token : token,
                    authenticated : true
                })
            }
        } 
        loadToken()
    }, [])

    const register = async (email: string, password: string) => {
        try{
            return await axios.post(`${API_URL}/Users`, {email, password})
        }catch(e){
            return {error: true, msg: (e as any).response.data.error}
        }
    }

    const login = async (email: string, password: string) => {
        await axios.post(`${API_URL}/Auth/Login`, {email: email, password: password})
        .then(async(response) => {
            setAuthState({
                token: response.data.data.token,
                authenticated: true
            })
            axios.defaults.headers.common['Authorization'] = `Bearer ${response.data.data.token}`
            await SecureStore.setItemAsync(TOKEN_KEY,response.data.data.token)
            return {error: false, msg: response.data.friendlyMessage}
        })
        .catch((error) => {
            console.log(error)
            return {error: true, msg: error.response.data.error}
        })
    }

    const logout = async () => {
        await SecureStore.deleteItemAsync(TOKEN_KEY)
        axios.defaults.headers.common['Authorization'] = ''
        setAuthState({
            token: null,
            authenticated : false
        })
    }

    const value = {
        onRegister : register,
        onLogin : login,
        onLogout: logout,
        authState
    }

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}