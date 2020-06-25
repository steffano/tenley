import React, {useContext} from 'react';
import {View, Text, Button} from 'react-native';
// import {GlobalContext} from '../../GlobalContext';
import * as Keychain from 'react-native-keychain';

const PaymentsLog = () => {
  // const [globalData, setGlobalData] = useContext(GlobalContext);

  Keychain.getGenericPassword().then(res => {
    console.log('#######', res);
  });

  return (
    <>
      <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
        <Text style={{fontFamily: 'VisbyCF-Medium'}}>PaymentsLog</Text>
      </View>
    </>
  );
};

export default PaymentsLog;
