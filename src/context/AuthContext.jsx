import { createContext, useContext, useEffect, useState } from 'react';
import api from '../services/api';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem('travel_token') || '');
  const [user, setUser] = useState(() => {
    try {
      const stored = localStorage.getItem('travel_user');
      return stored ? JSON.parse(stored) : null;
    } catch {
      return null;
    }
  });
  const [loading, setLoading] = useState(!!localStorage.getItem('travel_token'));

  // Persist token and user to localStorage whenever they change
  useEffect(() => {
    if (token) {
      localStorage.setItem('travel_token', token);
    } else {
      localStorage.removeItem('travel_token');
    }
  }, [token]);

  useEffect(() => {
    if (user) {
      localStorage.setItem('travel_user', JSON.stringify(user));
    } else {
      localStorage.removeItem('travel_user');
    }
  }, [user]);

  // Rehydrate user state from the backend when a token exists but user is null
  useEffect(() => {
    if (token && !user) {
      api.get('/auth/me')
        .then((res) => {
          setUser({
            email: res.data.email,
            fullName: res.data.fullName,
            roles: res.data.roles
          });
        })
        .catch(() => {
          // Token is invalid or expired – clear everything
          setToken('');
          setUser(null);
        })
        .finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, []); // run once on mount

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

  // Don't render children until we know whether the user is logged in
  if (loading) {
    return (
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '100vh' }}>
        <p style={{ color: '#64748b' }}>Loading…</p>
      </div>
    );
  }

  return (
    <AuthContext.Provider value={{ token, user, login, register, logout, isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
