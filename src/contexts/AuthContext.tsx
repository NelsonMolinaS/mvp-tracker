import { createContext, useContext, useState, ReactNode } from 'react';

interface AuthContextData {
  isAuthenticated: boolean;
  login: (u: string, p: string) => boolean;
  logout: () => void;
}

const AuthContext = createContext({} as AuthContextData);

const AUTH_KEY = 'continental_auth_session';

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    return localStorage.getItem(AUTH_KEY) === 'true';
  });

  const login = (u: string, p: string) => {
    const validUsername = u.trim().toLowerCase() === 'continental';
    const validPassword = p === 'conti68*';

    if (validUsername && validPassword) {
      setIsAuthenticated(true);
      localStorage.setItem(AUTH_KEY, 'true');
      return true;
    }
    return false;
  };

  const logout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem(AUTH_KEY);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
