import React, {useContext} from 'react';
import {GlobalContext} from '../../../GlobalContext';

import {Auth} from 'aws-amplify';
import ActiveUser from './ActiveUser';
import NewUser from './NewUser';
import ImportLoading from './ImportLoading';

const Accounts = ({navigation}) => {
  const [globalData] = useContext(GlobalContext);
  console.log(globalData.userStatus);
  // const userStatus = globalData.userStatus;
  return (
    // <ActiveUser />
    <NewUser navigation={navigation} />
    // <ImportLoading />
  );
};

export default Accounts;
