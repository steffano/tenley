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

export const addAccount = (postBody, jwt) => {
  api
    .post('/accounts', postBody, {headers: {Authorization: `Bearer ${jwt}`}})
    .then(response => console.log(response.data));
};
