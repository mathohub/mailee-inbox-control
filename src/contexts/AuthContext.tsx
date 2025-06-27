
import React, { createContext, useContext, useState, useEffect } from 'react';

interface User {
  id: string;
  name: string;
  email: string;
  isPaid: boolean;
  subscriptionStatus?: 'active' | 'cancelled';
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  loginWithGoogle: () => Promise<boolean>;
  register: (name: string, email: string, password: string) => Promise<boolean>;
  logout: () => void;
  completePurchase: () => void;
  cancelSubscription: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    // Simulate checking for existing session
    const savedUser = localStorage.getItem('mailee_user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // For demo, accept any email/password
    const userData = {
      id: '1',
      name: 'Demo User',
      email,
      isPaid: false,
      subscriptionStatus: 'active' as const
    };
    
    setUser(userData);
    localStorage.setItem('mailee_user', JSON.stringify(userData));
    return true;
  };

  const loginWithGoogle = async (): Promise<boolean> => {
    // Simulate Google OAuth
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    const userData = {
      id: '2',
      name: 'Google User',
      email: 'user@gmail.com',
      isPaid: false,
      subscriptionStatus: 'active' as const
    };
    
    setUser(userData);
    localStorage.setItem('mailee_user', JSON.stringify(userData));
    return true;
  };

  const register = async (name: string, email: string, password: string): Promise<boolean> => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const userData = {
      id: Date.now().toString(),
      name,
      email,
      isPaid: false,
      subscriptionStatus: 'active' as const
    };
    
    setUser(userData);
    localStorage.setItem('mailee_user', JSON.stringify(userData));
    return true;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('mailee_user');
  };

  const completePurchase = () => {
    if (user) {
      const updatedUser = { ...user, isPaid: true, subscriptionStatus: 'active' as const };
      setUser(updatedUser);
      localStorage.setItem('mailee_user', JSON.stringify(updatedUser));
    }
  };

  const cancelSubscription = () => {
    if (user) {
      const updatedUser = { ...user, subscriptionStatus: 'cancelled' as const };
      setUser(updatedUser);
      localStorage.setItem('mailee_user', JSON.stringify(updatedUser));
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, loginWithGoogle, register, logout, completePurchase, cancelSubscription }}>
      {children}
    </AuthContext.Provider>
  );
};
