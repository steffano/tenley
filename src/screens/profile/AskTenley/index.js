import React, {useContext} from 'react';
import {SafeAreaView, Text, Button} from 'react-native';
import {GlobalContext} from '../../../GlobalContext';
import * as Keychain from 'react-native-keychain';
import {Header} from '../../../components/Header';

const AskTenley = () => {
  return (
    <>
      <SafeAreaView style={{flex: 1}}>
        <Text style={{fontFamily: 'VisbyCF-Medium'}}>AskTenley</Text>
      </SafeAreaView>
    </>
  );
};

export default AskTenley;
