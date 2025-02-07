import React, {createContext, useContext, useState, useCallback} from 'react';
import {
  getAccountsList,
  getAccount,
  createAccount,
  updateAccount,
  deleteAccount,
} from '../apis';

const AccountsContext = createContext();

export const useAccounts = () => {
  const context = useContext(AccountsContext);
  if (!context) {
    throw new Error('useAccounts must be used within an AccountsProvider');
  }
  return context;
};

export const AccountsProvider = ({children}) => {
  const [accounts, setAccounts] = useState([]);
  const [selectedAccount, setSelectedAccount] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchAccounts = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await getAccountsList();
      if (response.ok) {
        setAccounts(response.data.data);
        return {success: true, data: response.data.data};
      } else {
        setError(response.data?.error || 'Failed to fetch accounts');
        return {success: false, error: response.data?.error};
      }
    } catch (err) {
      const message = err.message || 'An error occurred while fetching accounts';
      setError(message);
      return {success: false, error: message};
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchAccount = useCallback(async (accountId) => {
    setLoading(true);
    setError(null);
    try {
      const response = await getAccount(accountId);
      if (response.ok) {
        setSelectedAccount(response.data.data);
        return {success: true, data: response.data.data};
      } else {
        setError(response.data?.error || 'Failed to fetch account');
        return {success: false, error: response.data?.error};
      }
    } catch (err) {
      const message = err.message || 'An error occurred while fetching account';
      setError(message);
      return {success: false, error: message};
    } finally {
      setLoading(false);
    }
  }, []);

  const addAccount = useCallback(async (accountData) => {
    setLoading(true);
    setError(null);
    try {
      const response = await createAccount(accountData);
      if (response.ok) {
        setAccounts(prev => [...prev, response.data.data]);
        return {success: true, data: response.data.data};
      } else {
        setError(response.data?.error || 'Failed to create account');
        return {success: false, error: response.data?.error};
      }
    } catch (err) {
      const message = err.message || 'An error occurred while creating account';
      setError(message);
      return {success: false, error: message};
    } finally {
      setLoading(false);
    }
  }, []);

  const editAccount = useCallback(async (accountId, accountData) => {
    setLoading(true);
    setError(null);
    try {
      const response = await updateAccount(accountId, accountData);
      if (response.ok) {
        setAccounts(prev =>
          prev.map(acc =>
            acc.id === accountId ? {...acc, ...response.data.data} : acc,
          ),
        );
        if (selectedAccount?.id === accountId) {
          setSelectedAccount(response.data.data);
        }
        return {success: true, data: response.data.data};
      } else {
        setError(response.data?.error || 'Failed to update account');
        return {success: false, error: response.data?.error};
      }
    } catch (err) {
      const message = err.message || 'An error occurred while updating account';
      setError(message);
      return {success: false, error: message};
    } finally {
      setLoading(false);
    }
  }, [selectedAccount?.id]);

  const removeAccount = useCallback(async (accountId) => {
    setLoading(true);
    setError(null);
    try {
      const response = await deleteAccount(accountId);
      if (response.ok) {
        setAccounts(prev => prev.filter(acc => acc.id !== accountId));
        if (selectedAccount?.id === accountId) {
          setSelectedAccount(null);
        }
        return {success: true};
      } else {
        setError(response.data?.error || 'Failed to delete account');
        return {success: false, error: response.data?.error};
      }
    } catch (err) {
      const message = err.message || 'An error occurred while deleting account';
      setError(message);
      return {success: false, error: message};
    } finally {
      setLoading(false);
    }
  }, [selectedAccount?.id]);

  const value = {
    accounts,
    selectedAccount,
    loading,
    error,
    fetchAccounts,
    fetchAccount,
    addAccount,
    editAccount,
    removeAccount,
  };

  return (
    <AccountsContext.Provider value={value}>{children}</AccountsContext.Provider>
  );
};
