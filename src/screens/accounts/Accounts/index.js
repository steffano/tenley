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

  return accounts && accounts.length > 0 ? (
    <ActiveUser navigation={navigation} accounts={accounts} />
  ) : (
    <NewUser navigation={navigation} />
  );
};

export default Accounts;
