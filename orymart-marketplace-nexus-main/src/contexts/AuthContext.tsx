
import React, { createContext, useContext, useState } from 'react';

export interface User {
  id: string;
  email: string;
  name: string;
  type: 'buyer' | 'seller';
  avatar?: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string, type?: 'buyer' | 'seller') => Promise<boolean>;
  register: (email: string, password: string, name: string, type: 'buyer' | 'seller') => Promise<boolean>;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  const login = async (email: string, password: string, type: 'buyer' | 'seller' = 'buyer'): Promise<boolean> => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const mockUser: User = {
      id: Math.random().toString(36).substr(2, 9),
      email,
      name: email.split('@')[0],
      type,
    };
    
    setUser(mockUser);
    return true;
  };

  const register = async (email: string, password: string, name: string, type: 'buyer' | 'seller'): Promise<boolean> => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const mockUser: User = {
      id: Math.random().toString(36).substr(2, 9),
      email,
      name,
      type,
    };
    
    setUser(mockUser);
    return true;
  };

  const logout = () => {
    setUser(null);
  };

  const isAuthenticated = !!user;

  return (
    <AuthContext.Provider value={{
      user,
      login,
      register,
      logout,
      isAuthenticated,
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
