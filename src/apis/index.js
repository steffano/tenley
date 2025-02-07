import {create} from 'apisauce';

const api = create({
  baseURL: 'http://10.0.2.2:3000',
  headers: {Accept: 'application/json'},
});

const signIn = async (email, password) => {
  return await api.post('/users/sign_in', {
    user: { email, password }
  });
};

const signOut = async (token) => {
  return await api.delete('/users/sign_out', {}, {
    headers: { Authorization: `Bearer ${token}` }
  });
};

const signUp = async (userData) => {
  console.log('API: Making signup request to:', `${api.getBaseURL()}/users`);
  console.log('API: Request payload:', { user: userData });
  try {
    const response = await api.post('/users', {
      user: userData
    });
    console.log('API: Response status:', response.status);
    console.log('API: Response data:', response.data);
    return response;
  } catch (error) {
    console.error('API: Signup error:', error);
    return error.response || error;
  }
};

const addAccount = async (postBody, token) => {
  return await api.post('/accounts', postBody, {
    headers: {Authorization: `Bearer ${token}`},
  });
};

const getAccounts = async (token) => {
  return await api.get('/accounts', {}, {
    headers: {Authorization: `Bearer ${token}`}
  });
};

// Profile endpoints
const getProfile = async () => {
  console.log('API: Fetching user profile');
  try {
    const response = await api.get('/api/v1/profile');
    console.log('API: Profile response:', response.data);
    return response;
  } catch (error) {
    console.error('API: Profile fetch error:', error);
    return error.response || error;
  }
};

const updateProfile = async (profileData) => {
  console.log('API: Updating profile with:', profileData);
  try {
    const response = await api.patch('/api/v1/profile', { profile: profileData });
    console.log('API: Profile update response:', response.data);
    return response;
  } catch (error) {
    console.error('API: Profile update error:', error);
    return error.response || error;
  }
};

// Account endpoints
const getAccountsList = async () => {
  console.log('API: Fetching accounts');
  try {
    const response = await api.get('/api/v1/accounts');
    console.log('API: Accounts response:', response.data);
    return response;
  } catch (error) {
    console.error('API: Accounts fetch error:', error);
    return error.response || error;
  }
};

const getAccount = async (accountId) => {
  console.log('API: Fetching account:', accountId);
  try {
    const response = await api.get(`/api/v1/accounts/${accountId}`);
    console.log('API: Account response:', response.data);
    return response;
  } catch (error) {
    console.error('API: Account fetch error:', error);
    return error.response || error;
  }
};

const createAccount = async (accountData) => {
  console.log('API: Creating account:', accountData);
  try {
    const response = await api.post('/api/v1/accounts', { account: accountData });
    console.log('API: Account creation response:', response.data);
    return response;
  } catch (error) {
    console.error('API: Account creation error:', error);
    return error.response || error;
  }
};

const updateAccount = async (accountId, accountData) => {
  console.log('API: Updating account:', accountId, accountData);
  try {
    const response = await api.patch(`/api/v1/accounts/${accountId}`, { account: accountData });
    console.log('API: Account update response:', response.data);
    return response;
  } catch (error) {
    console.error('API: Account update error:', error);
    return error.response || error;
  }
};

const deleteAccount = async (accountId) => {
  console.log('API: Deleting account:', accountId);
  try {
    const response = await api.delete(`/api/v1/accounts/${accountId}`);
    console.log('API: Account deletion response:', response.data);
    return response;
  } catch (error) {
    console.error('API: Account deletion error:', error);
    return error.response || error;
  }
};

export {
  signIn,
  signOut,
  signUp,
  addAccount,
  getAccounts,
  getProfile,
  updateProfile,
  getAccountsList,
  getAccount,
  createAccount,
  updateAccount,
  deleteAccount,
};
