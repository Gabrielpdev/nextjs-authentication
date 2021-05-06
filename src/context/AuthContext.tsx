import Router from 'next/router';
import { setCookie } from 'nookies';
import { createContext, useState } from 'react';
import { api } from '../services/api';

type User =  {
  email: string;
  permission: string[];
  roles: string[];
};

type SignInCredentials =  {
  email: string;
  password: string;
};

type AuthContextData =  {
  signIn(credentials: SignInCredentials): Promise<void>;
  user: User;
  isAuthenticated: boolean;
}

export const AuthContext = createContext({} as AuthContextData)

export function AuthProvider({children}) {
  const [ user, setUser ] = useState<User>();
  const isAuthenticated = !!user;
  
  async function signIn({email, password}: SignInCredentials){

    try{
      const response = await api.post('sessions', {
        email,
        password
      })

      const { token, refreshToken, permission, roles } = response.data;

      setCookie(undefined, 'nextauth.token', token, {
        maxAge: 60 * 60 * 24 * 30, // 30 days
        path: '/'
      })
      setCookie(undefined, 'nextauth.refreshToken', refreshToken, {
        maxAge: 60 * 60 * 24 * 30, // 30 days
        path: '/'
      })
  
      setUser({
        email,
        permission,
        roles
      })

      Router.push('/dashboard');
      
    }catch(err){
      console.error(err)
    }
  }

  return (
    <AuthContext.Provider value={{ signIn, user, isAuthenticated}}>
      {children}
    </AuthContext.Provider>
  )
}