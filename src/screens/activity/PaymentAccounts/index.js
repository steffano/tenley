import React, {useContext, useEffect, useState} from 'react';
import {
  View,
  SafeAreaView,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import {RFPercentage, RFValue} from 'react-native-responsive-fontsize';
import {colors, Spacing, Typography} from '../../../utilities/styles';
import AccountTile from '../../../components/AccountTile';
import {AccountButton} from '../../../components/AccountButton';
import {Button} from '../../../components/Button';
import {GlobalContext} from '../../../GlobalContext';

const PaymentAccounts = ({navigation}) => {
  const [globalData, setGlobalData] = useContext(GlobalContext);
  const {accounts} = globalData;

  const accountsWithPayments = accounts
    ? accounts.filter(({payments}) => payments.length > 0)
    : null;

  return (
    <>
      <ScrollView>
        {accountsWithPayments.length === 0 ? (
          <>
            <View
              style={{
                margin: RFValue(15),
                flexDirection: 'row',
                justifyContent: 'flex-start',
                alignItems: 'flex-start',
              }}>
              <View style={styles.speechBubble}>
                <Text style={styles.text}>
                  {accounts.length === 0
                    ? 'It looks like you haven’t added any accounts yet! Add an account to begin making payments.'
                    : 'It looks like you haven’t made any payments yet! Make a single payment or schedule recurring payments below.'}
                </Text>
              </View>
              <View style={{width: RFPercentage(30)}}>
                <Image
                  source={require('../../../assets/mascot/tenley-mascot3.png')}
                  resizeMode="contain"
                  style={styles.tenleyImage}
                />
              </View>
            </View>

            <View>
              {accounts.map((account, key) => {
                return (
                  account && (
                    <AccountTile
                      key={key}
                      account={account}
                      navigation={navigation}
                    />
                  )
                );
              })}
            </View>
          </>
        ) : (
          <View style={{marginTop: RFValue(15)}}>
            <View style={{marginHorizontal: 15}}>
              {accountsWithPayments.map((account, index) => {
                return (
                  account && (
                    <AccountButton
                      key={index}
                      account={account}
                      navigation={navigation}
                      accountName={account.originalCreditorName}
                      lastFour={account.originalCreditorAccountNumber.slice(-4)}
                      onPress={() =>
                        navigation.navigate('Payment Activity', {
                          account,
                          index,
                        })
                      }
                    />
                  )
                );
              })}
            </View>
          </View>
        )}

        {accounts.length === 0 && (
          <View
            style={[Spacing.bottomButtonsContainer, {marginTop: RFValue(20)}]}>
            <Button
              title="Add an Account"
              onPress={() => navigation.navigate('Accounts')}
            />
          </View>
        )}
        <View style={{height: RFValue(70)}} />
      </ScrollView>
      <TouchableOpacity
        onPress={() => navigation.navigate('AskTenley')}
        style={styles.helpIconWrapper}>
        <Image
          source={require('../../../assets/icons/help-bubble.png')}
          resizeMode="contain"
          style={styles.helpIcon}
        />
      </TouchableOpacity>
    </>
  );
};

export default PaymentAccounts;

const styles = StyleSheet.create({
  container: {
    ...Spacing.defaultContainer,
  },
  text: {
    color: colors.darkGreen,
    fontFamily: 'Poppins-Regular',
    fontSize: RFValue(11),
    letterSpacing: 0.8,
    paddingHorizontal: RFValue(10),
    textAlign: 'center',
  },
  tenleyImage: {
    width: RFValue(200),
    height: RFValue(300),
  },
  helpButton: {
    backgroundColor: colors.tenleyGreen,
    paddingHorizontal: RFValue(12),
    borderRadius: 100,
    marginVertical: 20,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  speechBubble: {
    width: RFPercentage(21),
    borderColor: colors.lightGray,
    borderWidth: 2,
    borderRadius: 5,
    alignSelf: 'flex-start',
    paddingVertical: 15,
  },
  helpIconWrapper: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    right: RFValue(0),
    bottom: RFValue(0),
  },
  helpIcon: {
    width: RFValue(50),
    height: RFValue(50),
    alignSelf: 'flex-end',
    margin: 20,
  },
});
