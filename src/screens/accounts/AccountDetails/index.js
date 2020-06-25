import React, {useContext} from 'react';
import {SafeAreaView, Text, Button} from 'react-native';
// import {GlobalContext} from '../../GlobalContext';
import * as Keychain from 'react-native-keychain';

const AccountDetails = () => {
  // const [globalData, setGlobalData] = useContext(GlobalContext);

  Keychain.getGenericPassword().then(res => {
    console.log('#######', res);
  });

  return (
    <>
      <SafeAreaView
        style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
        <Text style={{fontFamily: 'VisbyCF-Medium'}}>AccountDetails</Text>
      </SafeAreaView>
    </>
  );
};

export default AccountDetails;
