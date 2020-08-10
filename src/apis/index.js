import {create} from 'apisauce';
import {Auth} from 'aws-amplify';

const getToken = async () => {
  try {
    return await Auth.currentSession()
      .then(res => {
        let accessToken = res.getAccessToken();
        let jwt = accessToken.getJwtToken();
        console.log(`myAccessToken: ${JSON.stringify(accessToken)}`);
        console.log(jwt);
      })
      .catch(err => {
        console.log(err);
      });
  } catch (err) {
    console.log(err);
  }
};

const getJwt = async () => {
  await Auth.currentSession().then(data => data.accessToken.jwtToken);
};

const api = create({
  baseURL:
    'http://tenleyapi-env.eba-4a3u3vcc.us-west-2.elasticbeanstalk.com/v1',
  headers: {Accept: 'application/json'},
});

const addAccount = async postBody => {
  const jwt = await Auth.currentSession().then(
    data => data.accessToken.jwtToken,
  );
  return await api.post('/accounts', postBody, {
    headers: {Authorization: `Bearer ${jwt}`},
  });
};

const getAccounts = async () => {
  const jwt = await Auth.currentSession().then(
    data => data.accessToken.jwtToken,
  );
  api.setHeader('Authorization', `Bearer ${jwt}`);
  return api.get('/accounts');
};

const importAccounts = async () => {
  const jwt = await Auth.currentSession().then(
    data => data.accessToken.jwtToken,
  );
  api.setHeader('Authorization', `Bearer ${jwt}`);
  return api.post('/accounts/import');
};

const postSettlement = async (postBody, id) => {
  const jwt = await Auth.currentSession().then(
    data => data.accessToken.jwtToken,
  );
  return api.post(`/accounts/${id}/settlement`, postBody, {
    headers: {Authorization: `Bearer ${jwt}`},
  });
};

const oneTimePayment = async (postBody, id) => {
  const jwt = await Auth.currentSession().then(
    data => data.accessToken.jwtToken,
  );
  return api.post(`/payments/${id}/payment`, postBody, {
    headers: {Authorization: `Bearer ${jwt}`},
  });
};

const schedulePayments = async (postBody, id) => {
  const jwt = await Auth.currentSession().then(
    data => data.accessToken.jwtToken,
  );
  return api.post(`/payments/${id}/schedule`, postBody, {
    headers: {Authorization: `Bearer ${jwt}`},
  });
};

export default {
  getAccounts,
  addAccount,
  postSettlement,
  importAccounts,
  oneTimePayment,
  schedulePayments,
};

// export const getAccounts = jwt =>
//   api.setHeader('Authorization', `Bearer ${jwt}`);
// api.get('/accounts');
