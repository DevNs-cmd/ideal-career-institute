import React, { createContext, useContext, useState, useEffect } from 'react';
import { api } from '../lib/api';

export interface AdminUser {
  id: number;
  username: string;
  email: string;
  fullName: string;
  role: string;
}

interface AuthContextType {
  user: AdminUser | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (token: string, user: AdminUser) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [token, setToken] = useState<string | null>(() => localStorage.getItem('ici_admin_token'));
  const [user, setUser] = useState<AdminUser | null>(() => {
    try {
      const savedUser = localStorage.getItem('ici_admin_user');
      return savedUser ? JSON.parse(savedUser) : null;
    } catch {
      return null;
    }
  });
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    async function verifyAuth() {
      const storedToken = localStorage.getItem('ici_admin_token');
      if (!storedToken) {
        return;
      }

      try {
        const res = await api.getMe();
        if (res && res.user) {
          const freshUser = {
            id: res.user.id,
            username: res.user.username,
            email: res.user.email,
            fullName: res.user.fullName || res.user.full_name || 'Administrator',
            role: res.user.role || 'superadmin'
          };
          setUser(freshUser);
          localStorage.setItem('ici_admin_user', JSON.stringify(freshUser));
        }
      } catch (err) {
        console.warn('Background auth verification failed:', err);
      }
    }

    verifyAuth();
  }, []);

  const login = (newToken: string, newUser: AdminUser) => {
    localStorage.setItem('ici_admin_token', newToken);
    localStorage.setItem('ici_admin_user', JSON.stringify(newUser));
    setToken(newToken);
    setUser(newUser);
  };

  const logout = () => {
    localStorage.removeItem('ici_admin_token');
    localStorage.removeItem('ici_admin_user');
    setToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        isAuthenticated: !!token && !!user,
        isLoading,
        login,
        logout
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
