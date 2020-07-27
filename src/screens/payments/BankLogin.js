import React, {useContext, useState} from 'react';
import {SafeAreaView, Text, View, StyleSheet} from 'react-native';
import {colors, Spacing} from '../../utilities/styles';
import {Button} from '../../components/Button';
import {ScreenHeader} from '../../components/ScreenHeader';

import {RFValue} from 'react-native-responsive-fontsize';

const BankLogin = ({navigation, route}) => {
  return (
    <>
      <SafeAreaView style={styles.container}>
        <ScreenHeader title={'Bank Login'} navigation={navigation} />
        <View style={styles.container}>
          <Text>screenshot</Text>
          <Button
            title="Login to Bank"
            onPress={() => navigation.navigate('PaymentConfirmation')}
          />
        </View>
      </SafeAreaView>
    </>
  );
};

export default BankLogin;

const styles = StyleSheet.create({
  container: {
    ...Spacing.defaultContainer,
  },
});
