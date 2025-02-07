import React, {createContext, useContext, useState, useCallback} from 'react';
import {getProfile, updateProfile} from '../apis';

const ProfileContext = createContext();

export const useProfile = () => {
  const context = useContext(ProfileContext);
  if (!context) {
    throw new Error('useProfile must be used within a ProfileProvider');
  }
  return context;
};

export const ProfileProvider = ({children}) => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchProfile = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await getProfile();
      if (response.ok) {
        setProfile(response.data.data);
        return {success: true, data: response.data.data};
      } else {
        setError(response.data?.error || 'Failed to fetch profile');
        return {success: false, error: response.data?.error};
      }
    } catch (err) {
      const message = err.message || 'An error occurred while fetching profile';
      setError(message);
      return {success: false, error: message};
    } finally {
      setLoading(false);
    }
  }, []);

  const updateUserProfile = useCallback(async (profileData) => {
    setLoading(true);
    setError(null);
    try {
      const response = await updateProfile(profileData);
      if (response.ok) {
        setProfile(response.data.data);
        return {success: true, data: response.data.data};
      } else {
        setError(response.data?.error || 'Failed to update profile');
        return {success: false, error: response.data?.error};
      }
    } catch (err) {
      const message = err.message || 'An error occurred while updating profile';
      setError(message);
      return {success: false, error: message};
    } finally {
      setLoading(false);
    }
  }, []);

  const value = {
    profile,
    loading,
    error,
    fetchProfile,
    updateProfile: updateUserProfile,
  };

  return (
    <ProfileContext.Provider value={value}>{children}</ProfileContext.Provider>
  );
};
