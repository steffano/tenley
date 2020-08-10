import React from 'react';
import {
  View,
  SafeAreaView,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import {Button} from '../Button';
import {AccountButton} from '../AccountButton';
import {colors, Spacing, Typography} from '../../utilities/styles';
import {RFValue} from 'react-native-responsive-fontsize';
import currency from 'currency.js';

const SelectAccount = ({onClose, navigation, accounts}) => {
  const USD = value => currency(value, {symbol: '$', precision: 0}).format();

  return (
    <SafeAreaView style={styles.modalWrap}>
      <View
        style={{
          backgroundColor: 'white',
          justifyContent: 'center',
          padding: 15,
          borderRadius: 5,
        }}>
        <View style={{alignItems: 'flex-end'}}>
          <TouchableOpacity onPress={onClose}>
            <Image
              source={require('../../assets/icons/close.png')}
              resizeMode="contain"
              style={{
                height: 15,
                width: 15,
              }}
            />
          </TouchableOpacity>
        </View>
        <Text style={[styles.header, {textAlign: 'center'}]}>
          Select an account
        </Text>
        <Text style={[styles.subheader, {textAlign: 'center'}]}>
          To begin payments or a settlement negotiation, select an account to
          view.
        </Text>
        {accounts.slice(0, 2).map((account, key) => {
          return (
            account && (
              <AccountButton
                key={key}
                account={account}
                navigation={navigation}
                accountName={account.originalCreditorName}
                lastFour={account.originalCreditorAccountNumber.slice(-4)}
                balance={USD(account.amountOwed)}
                onPress={() => {
                  onClose();
                  navigation.navigate('Account Details', {account});
                }}
              />
            )
          );
        })}
      </View>
    </SafeAreaView>
  );
};

export default SelectAccount;

const styles = StyleSheet.create({
  container: {
    ...Spacing.defaultContainer,
  },
  modalWrap: {
    alignContent: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    borderRadius: 5,
  },
  header: {
    fontFamily: 'Poppins-Bold',
    letterSpacing: 0.9,
    fontSize: 16,
    color: colors.darkGreen,
  },
  subheader: {
    fontFamily: 'Poppins-Regular',
    fontSize: RFValue(10),
    letterSpacing: 0.5,
    marginVertical: 10,
    alignSelf: 'center',
    color: colors.darkGreen,
    lineHeight: RFValue(15),
  },
  text: {
    color: colors.darkGreen,
    fontFamily: 'Poppins-Regular',
    fontSize: 12,
    letterSpacing: 0.8,
    paddingHorizontal: 15,
    textAlign: 'center',
  },
  greenNumbers: {
    ...Typography.boldGreen,
    alignSelf: 'flex-start',
    marginRight: 10,
  },
  bodyText: {
    ...Typography.bodyText,
    alignSelf: 'flex-start',
    paddingTop: 2,
  },
});
