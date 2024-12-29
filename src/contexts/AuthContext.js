import React, { createContext, useState, useContext } from 'react';
import { signIn, signOut, signUp, verify, updateUser } from '../apis';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(null);
  const [user, setUser] = useState(null);
  const [verificationCode, setVerificationCode] = useState(null);

  const login = async (email, password) => {
    try {
      const response = await signIn(email, password);
      if (response.ok) {
        setToken(response.data.data.token);
        setUser(response.data.data.user);
        return { 
          success: true,
          user: response.data.data.user,
          token: response.data.data.token,
          loggedIn: true
        };
      }
      return { success: false, error: response.data?.error || 'Login failed' };
    } catch (error) {
      return { success: false, error: error.message };
    }
  };

  const logout = async () => {
    try {
      if (token) {
        await signOut(token);
      }
      setToken(null);
      setUser(null);
      return { success: true };
    } catch (error) {
      return { success: false, error: error.message };
    }
  };

  const register = async (email, password, userData) => {
    try {
      console.log('AuthContext: Starting registration with:', { email, ...userData });
      const response = await signUp({
        ...userData,
        email,
        password
      });
      console.log('AuthContext: Registration API response:', response);
      
      if (response.ok) {
        console.log('AuthContext: Registration successful');
        setUser(response.data.data.user);
        return { success: true, user: response.data.data.user };
      }
      console.log('AuthContext: Registration failed:', response.data?.error || 'Registration failed');
      return { success: false, error: response.data?.error || 'Registration failed' };
    } catch (error) {
      console.log('AuthContext: Registration error:', error);
      return { success: false, error: error.message };
    }
  };
  
  const verifyUser = async (code) => {
    try {
      const response = await verify(code);
      if (response.ok) {
        return { success: true };
      }
      return { success: false, error: response.data?.error || 'Verification failed' };
    } catch (error) {
      return { success: false, error: error.message };
    }
  };

  const updateUserProfile = async (userData) => {
    try {
      const response = await updateUser(token, userData);
      if (response.ok) {
        const updatedUser = { ...user, ...userData };
        setUser(updatedUser);
        return { success: true, user: updatedUser };
      }
      return { success: false, error: response.data?.error || 'Update failed' };
    } catch (error) {
      return { success: false, error: error.message };
    }
  };

  const loginWithBiometric = async () => {
    try {
      // Implementation will depend on the biometric library used
      // For now, returning not implemented
      return { success: false, error: 'Biometric login not implemented' };
    } catch (error) {
      return { success: false, error: error.message };
    }
  };

  const resendVerificationCode = async () => {
    try {
      // Implementation for resending verification code
      return { success: true };
    } catch (error) {
      return { success: false, error: error.message };
    }
  };

  return (
    <AuthContext.Provider value={{ 
      token, 
      user, 
      login, 
      logout, 
      register,
      verifyUser,
      updateUserProfile,
      loginWithBiometric,
      resendVerificationCode,
      isAuthenticated: !!token 
    }}>
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