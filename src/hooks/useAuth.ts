'use client';

import { useEffect, useState } from 'react';
import { loginUser, LoginPayload } from '../lib/api/auth.api';

export const useAuth = () => {
  const [token, setToken] = useState<string | null>(null);
  const [userId, setUserId] = useState<string | null>(null);
  const [loaded, setLoaded] = useState(false);

  // Load from localStorage on client mount
  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    const storedUserId = localStorage.getItem('userId');

    setToken(storedToken);
    setUserId(storedUserId);
    setLoaded(true);
  }, []);

  // Login handler
  const login = async (data: LoginPayload) => {
    const result = await loginUser(data);
    if (result.success) {
      localStorage.setItem('token', result.token);
      localStorage.setItem('userId', result.userId);
      setToken(result.token);
      setUserId(result.userId);
    }
    return result;
  };

  // Logout handler
  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    setToken(null);
    setUserId(null);
  };

  return {
    token,
    userId,
    login,
    logout,
    loaded, // 
  };
};
