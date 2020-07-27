import React, {useContext, useState} from 'react';
import {
  SafeAreaView,
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
} from 'react-native';
import {Button} from '../../components/Button';
import {ScreenHeader} from '../../components/ScreenHeader';
import Bullet from '../../components/Bullet';
import {colors, Spacing} from '../../utilities/styles';
import {RFValue} from 'react-native-responsive-fontsize';
import currency from 'currency.js';

const PaymentSetup = ({navigation, route}) => {
  const account = route.params.account;

  const toUSD = value => currency(value, {symbol: '$', precision: 0}).format();

  return (
    <>
      <SafeAreaView style={styles.container}>
        <ScreenHeader title={'Setup Payment'} navigation={navigation} />
        <View style={styles.container}>
          <View style={Spacing.blockContainer}>
            <View style={styles.accountWrap}>
              <View style={styles.row}>
                <View style={[styles.row, {alignItems: 'flex-start'}]}>
                  <Text style={[styles.accountTitle, {maxWidth: 150}]}>
                    {account.originalCreditorName}
                  </Text>
                  <View style={[styles.row, {alignItems: 'center'}]}>
                    <Bullet color="black" small />
                    <Text style={styles.accountTitle}>
                      {account.originalCreditorAccountNumber.slice(-4)}
                    </Text>
                  </View>
                </View>
                <View>
                  <Text style={styles.balanceText}>
                    {toUSD(account.amountOwed)}
                  </Text>
                </View>
              </View>
            </View>
          </View>
          <View style={[styles.row, Spacing.horizontalBase]}>
            <View style={styles.speechBubble}>
              <Text style={styles.speechBubbleText}>
                What type of payment would you like to make?
              </Text>
            </View>
            <Image
              source={require('../../assets/mascot/tenley-mascot4-left.png')}
              resizeMode="contain"
              style={styles.tenleyImage}
            />
          </View>
          <View style={Spacing.greenLine} />
          <View style={Spacing.blockContainer}>
            <TouchableOpacity
              onPress={() =>
                navigation.navigate('PaymentCalculator', {
                  account,
                  paymentType: 'recurring',
                })
              }
              style={[
                styles.paymentButton,
                {backgroundColor: colors.mediumGreen},
              ]}>
              <Text style={styles.buttonTitle}>Recurring Payments</Text>
              <Text style={styles.buttonText}>
                Set up a payment schedule by choosing your monthly payment
                amount and withdrawal dates.
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() =>
                navigation.navigate('PaymentCalculator', {
                  account,
                  paymentType: 'oneTime',
                })
              }
              style={[styles.paymentButton, {backgroundColor: colors.orange}]}>
              <Text style={styles.buttonTitle}>One Time Payment</Text>
              <Text style={styles.buttonText}>
                Make a single payment on this account.
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    </>
  );
};

export default PaymentSetup;

const styles = StyleSheet.create({
  container: {
    ...Spacing.defaultContainer,
    justifyContent: 'flex-start',
  },
  paymentButton: {
    borderRadius: 5,
    paddingHorizontal: RFValue(20),
    paddingVertical: RFValue(15),
    justifyContent: 'center',
    marginVertical: RFValue(15),
  },
  buttonTitle: {
    color: 'white',
    fontFamily: 'Poppins-Bold',
    fontSize: RFValue(14),
    letterSpacing: 0.75,
    marginBottom: 10,
  },
  buttonText: {
    color: 'white',
    fontFamily: 'Poppins-Regular',
    fontSize: RFValue(13),
    letterSpacing: 0.75,
  },
  bottomButtonsContainer: {
    flex: 1,
    paddingHorizontal: 15,
    justifyContent: 'flex-end',
    marginBottom: 10,
  },
  tenleyImage: {
    width: RFValue(150),
    height: RFValue(150),
    alignSelf: 'flex-end',
  },
  text: {
    fontFamily: 'Poppins-Regular',
    letterSpacing: 0.8,
    fontSize: RFValue(10),
  },
  accountWrap: {
    height: RFValue(60),
    borderWidth: 1,
    borderRadius: 5,
    borderColor: colors.lightGray,
    justifyContent: 'center',
    paddingHorizontal: RFValue(15),
    marginVertical: RFValue(15),
  },
  accountTitle: {
    fontFamily: 'Poppins-Regular',
    fontSize: RFValue(12),
    letterSpacing: 1.25,
    color: colors.darkGreen,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignContent: 'center',
    alignItems: 'center',
  },
  balanceText: {
    fontFamily: 'Poppins-Bold',
    color: colors.darkGreen,
    fontSize: RFValue(17),
  },
  speechBubble: {
    alignSelf: 'flex-start',
    width: '60%',
    borderWidth: 1,
    borderColor: colors.lightGray,
    justifyContent: 'center',
    padding: 15,
  },
  speechBubbleText: {
    fontFamily: 'Poppins-Bold',
    letterSpacing: 0.8,
    fontSize: RFValue(14),
    textAlign: 'center',
    color: colors.darkGreen,
  },
});
