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
  try {
    const response = await api.get('/accounts', {}, {
      headers: { Authorization: `Bearer ${token}` }
    });
    return response.data || []; // Return empty array if data is undefined
  } catch (error) {
    console.error('Error fetching accounts:', error);
    return [];
  }
};

export { signIn, signOut, signUp, addAccount, getAccounts };
