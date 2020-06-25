import React, {useContext} from 'react';
import {SafeAreaView, Text, Button} from 'react-native';
import {GlobalContext} from '../../../GlobalContext';
import {Header} from '../../../components/Header';

const NotificationSettings = () => {
  return (
    <>
      <SafeAreaView style={{flex: 1}}>
        <Text style={{fontFamily: 'VisbyCF-Medium'}}>NotificationSettings</Text>
      </SafeAreaView>
    </>
  );
};

export default NotificationSettings;
