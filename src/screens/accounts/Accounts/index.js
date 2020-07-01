import React from 'react';
import {Auth} from 'aws-amplify';
import ActiveUser from './ActiveUser';
import NewUser from './NewUser';

const Accounts = ({navigation}) => {
  return (
    <ActiveUser />
    // <NewUser navigation={navigation} />
  );
};

export default Accounts;
