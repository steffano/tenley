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

  const fetchUserProfile = async (authToken) => {
    try {
      console.log('Fetching user profile');
      
      // Try different IP configurations based on platform
      // For real device testing, you should use your computer's actual IP address
      const baseUrls = [
        'http://10.0.2.2:3000',    // Android emulator
        'http://localhost:3000',   // iOS simulator
        'http://127.0.0.1:3000'    // Alternative localhost
      ];
      
      let response = null;
      let fetchError = null;
      
      // Try each base URL until one works
      for (const baseUrl of baseUrls) {
        try {
          console.log(`Trying to fetch profile from: ${baseUrl}/api/v1/profile`);
          
          response = await fetch(`${baseUrl}/api/v1/profile`, {
            headers: {
              'Authorization': `Bearer ${authToken}`,
              'Accept': 'application/json'
            },
            // Add timeout to prevent long hanging requests
            timeout: 5000
          });
          
          console.log(`Response from ${baseUrl}: ${response.status}`);
          
          if (response.ok) {
            break; // Found a working URL, exit the loop
          }
        } catch (error) {
          console.log(`Error with ${baseUrl}: ${error.message}`);
          fetchError = error;
          // Continue to try the next URL
        }
      }
      
      if (!response || !response.ok) {
        throw fetchError || new Error('Failed to fetch profile from any endpoint');
      }
      
      const data = await response.json();
      console.log('Profile data:', data);
      
      if (data.data && data.data.user) {
        return { success: true, user: data.data.user };
      }
      
      return { success: false, error: 'Invalid profile data' };
    } catch (error) {
      console.error('Error fetching profile:', error);
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
      fetchUserProfile,
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