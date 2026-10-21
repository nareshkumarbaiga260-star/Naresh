import React, { createContext, useContext, useState, useEffect } from 'react';

export interface User {
  email: string;
  role: 'admin';
  name: string;
}

export interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password?: string) => { success: boolean; message: string };
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AUTHORIZED_ADMIN_EMAIL = 'nareshkumarbaiga260@gmail.com';
const STORAGE_AUTH_USER_KEY = 'naresh_auth_user';

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(() => {
    try {
      const saved = sessionStorage.getItem(STORAGE_AUTH_USER_KEY);
      if (saved) return JSON.parse(saved);
    } catch {
      // ignore
    }
    return null;
  });

  const isAuthenticated = !!user;

  // Simple simulated login function that validates hardcoded email 'nareshkumarbaiga260@gmail.com' and updates state
  const login = (email: string, _password?: string) => {
    const cleanEmail = email.trim().toLowerCase();

    if (cleanEmail === AUTHORIZED_ADMIN_EMAIL.toLowerCase()) {
      const authenticatedUser: User = {
        email: AUTHORIZED_ADMIN_EMAIL,
        role: 'admin',
        name: 'Naresh Kumar Baiga (Admin)'
      };

      setUser(authenticatedUser);
      try {
        sessionStorage.setItem(STORAGE_AUTH_USER_KEY, JSON.stringify(authenticatedUser));
        sessionStorage.setItem('naresh_admin_session', 'active');
      } catch {
        // ignore
      }

      return {
        success: true,
        message: 'प्रमाणीकरण सफल! आपका स्वागत है Naresh Technical एडमिन कंसोल में।'
      };
    }

    return {
      success: false,
      message: `अमान्य ईमेल आईडी। केवल अधिकृत एडमिन ईमेल (${AUTHORIZED_ADMIN_EMAIL}) को ही अनुमति है।`
    };
  };

  const logout = () => {
    setUser(null);
    try {
      sessionStorage.removeItem(STORAGE_AUTH_USER_KEY);
      sessionStorage.removeItem('naresh_admin_session');
    } catch {
      // ignore
    }
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export default AuthContext;
