import {create} from 'apisauce';
// import {Auth} from 'aws-amplify';

// const getToken = async () => {
//   try {
//     await Auth.currentSession()
//       .then(res => {
//         let accessToken = res.getAccessToken();
//         let jwt = accessToken.getJwtToken();
//         console.log(`myAccessToken: ${JSON.stringify(accessToken)}`);
//         console.log(`myJwt: ${jwt}`);
//       })
//       .catch(err => {
//         console.log(err);
//       });
//   } catch (err) {
//     console.log(err);
//   }
// };

const api = create({
  baseURL:
    'http://tenleyapi-env.eba-4a3u3vcc.us-west-2.elasticbeanstalk.com/v1',
  headers: {Accept: 'application/json'},
});

const addAccount = (postBody, jwt) => {
  return api.post('/accounts', postBody, {
    headers: {Authorization: `Bearer ${jwt}`},
  });
  // .then(response => console.log(response.data));
};

const getAccounts = async jwt => {
  // console.log(jwt, 'jwt');
  api.setHeader('Authorization', `Bearer ${jwt}`);
  return api.get('/accounts');
};

const importAccounts = async jwt => {
  return api
    .post('/accounts/import', {
      headers: {Authorization: `Bearer ${jwt}`},
    })
    .then(response => console.log(response.data));
};

const postSettlement = async (postBody, jwt, id) => {
  return api.post(`/accounts/${id}/settlement`, postBody, {
    headers: {Authorization: `Bearer ${jwt}`},
  });
};

export default {
  getAccounts,
  addAccount,
  postSettlement,
  importAccounts,
};

// export const getAccounts = jwt =>
//   api.setHeader('Authorization', `Bearer ${jwt}`);
// api.get('/accounts');
