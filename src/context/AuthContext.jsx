import { createContext, useContext, useEffect, useState } from 'react';
import api from '../services/api';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem('travel_token') || '');
  const [user, setUser] = useState(null);

  useEffect(() => {
    if (token) {
      localStorage.setItem('travel_token', token);
    } else {
      localStorage.removeItem('travel_token');
    }
  }, [token]);

  const login = async (credentials) => {
    const response = await api.post('/auth/login', credentials);
    const authData = response.data;
    setToken(authData.token);
    setUser({
      email: authData.email,
      fullName: authData.fullName,
      roles: authData.roles
    });
    return authData;
  };

  const register = async (formData) => {
    const response = await api.post('/auth/register', formData);
    const authData = response.data;
    setToken(authData.token);
    setUser({
      email: authData.email,
      fullName: authData.fullName,
      roles: authData.roles
    });
    return authData;
  };

  const logout = () => {
    setToken('');
    setUser(null);
  };

  const isAuthenticated = !!token;

  return (
    <AuthContext.Provider value={{ token, user, login, register, logout, isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
