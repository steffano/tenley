import React, {useContext, useEffect, useState} from 'react';
import {GlobalContext} from '../../../GlobalContext';

import {Auth} from 'aws-amplify';
import ActiveUser from './ActiveUser';
import NewUser from './NewUser';
import ImportLoading from './ImportLoading';
import apis from '../../../apis/';

const Accounts = ({navigation}) => {
  const [globalData, setGlobalData] = useContext(GlobalContext);
  const {user, accounts, session} = globalData;

  // const [data, setData] = useState([]);
  // const jwt = session.accessToken.jwtToken;

  // useEffect(() => {
  //   const getAccounts = async () => {
  //     const accts = await apis.getAccounts(jwt);
  //     if (accts.data.with.length > 0) {
  //       setData(accts.data.with);
  //       setGlobalData({...globalData, accounts: accts.data.with});
  //     }
  //     console.log('this', accts.data);
  //   };
  //   getAccounts();
  // }, []);

  // const userStatus = globalData.userStatus;
  return accounts.length > 0 ? (
    <ActiveUser navigation={navigation} accounts={accounts} />
  ) : (
    <NewUser navigation={navigation} />
  );
  // <ImportLoading />
};

export default Accounts;
