import React, {useContext} from 'react';
import {SafeAreaView, Text, Button} from 'react-native';
import {GlobalContext} from '../../../GlobalContext';
import * as Keychain from 'react-native-keychain';
import {Header} from '../../../components/Header';

const Agreements = () => {
  return (
    <>
      <SafeAreaView style={{flex: 1}}>
        <Text style={{fontFamily: 'VisbyCF-Medium'}}>Agreementsl</Text>
      </SafeAreaView>
    </>
  );
};

export default Agreements;
