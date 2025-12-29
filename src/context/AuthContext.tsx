/* eslint-disable react-refresh/only-export-components */

import { createContext, useContext, useState } from 'react';
import { LOCALSTORAGE_KEYS } from '../Constant';
import type { IUser } from '../Types';

interface AuthContextType {
  user: IUser | null;
  login: (user: IUser, tokens: { accessToken: string; refreshToken: string }) => void;
  logout: () => void;
  isLoggedIn: boolean;
}

const AuthContext = createContext<AuthContextType>(null!);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<IUser | null>(null);
  const isLoggedIn = !!user;

  const login = (user: IUser, tokens: { accessToken: string; refreshToken: string }) => {
    setUser(user);
    localStorage.setItem(LOCALSTORAGE_KEYS.ACCESS_TOKEN, tokens.accessToken);
    localStorage.setItem(LOCALSTORAGE_KEYS.REFRESH_TOKEN, tokens.refreshToken);
    console.log('[Auth] User logged in:', user.name);
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem(LOCALSTORAGE_KEYS.ACCESS_TOKEN);
    localStorage.removeItem(LOCALSTORAGE_KEYS.REFRESH_TOKEN);
    console.log('[Auth] User logged out');
  };

  return <AuthContext.Provider value={{ user, login, logout, isLoggedIn }}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
}
