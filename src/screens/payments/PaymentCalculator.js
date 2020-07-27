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
import AccountTile from '../../components/AccountTile';
import Bullet from '../../components/Bullet';
import currency from 'currency.js';
import Slider from '../../components/Calculator/Slider';

import {colors, Spacing} from '../../utilities/styles';
import {RFValue} from 'react-native-responsive-fontsize';

const PaymentCalculator = ({navigation, route}) => {
  const paymentType = route.params.paymentType;
  const account = route.params.account;

  const accountTotal = currency(account.amountOwed).value;
  const [payment, setPayment] = useState(accountTotal * 0.6);
  const [months, setMonths] = useState(Math.ceil(accountTotal / payment));

  const updatePayment = val => {
    setPayment(val);
    setMonths(Math.ceil(accountTotal / val));
  };

  const updateMonths = val => {
    setMonths(Math.ceil(val));
    setPayment(Math.ceil(accountTotal / val / 10) * 10);
  };

  const toUSD = value => currency(value, {symbol: '$', precision: 0}).format();

  return (
    <>
      <SafeAreaView style={styles.container}>
        <ScreenHeader
          title={
            paymentType === 'oneTime' ? 'One Time Payment' : 'Schedule Payments'
          }
          navigation={navigation}
        />
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

            {paymentType === 'oneTime' ? (
              <Slider
                isCurrency
                min={20}
                max={accountTotal}
                total={payment}
                onSlide={val => setPayment(val)}
                title={'Payment Amount'}
              />
            ) : (
              <>
                <Slider
                  min={Math.ceil(accountTotal / 36 / 10) * 10}
                  max={accountTotal}
                  total={payment}
                  onSlide={updatePayment}
                  isCurrency
                  title={'Monthly Payment'}
                />
                <View style={{height: RFValue(30)}} />

                <Slider
                  min={1}
                  max={36}
                  total={months}
                  onSlide={updateMonths}
                  title={'Months to Payoff'}
                />
              </>
            )}
          </View>
          <View
            style={{
              marginVertical: RFValue(20),
              borderBottomWidth: 1,
              borderColor: colors.lightGray,
            }}
          />
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginHorizontal: 10,
            }}>
            <Image
              source={require('../../assets/icons/checkmark/fill.png')}
              resizeMode="contain"
              style={{
                maxWidth: RFValue(20),
                maxHeight: RFValue(20),
                marginHorizontal: RFValue(10),
              }}
            />
            <Text
              style={{
                fontFamily: 'Poppins-Regular',
                fontSize: RFValue(11),
                letterSpacing: RFValue(1),
              }}>
              Apply 10 Tenley Bucks to this payment{'  '}
            </Text>
            <Image
              source={require('../../assets/icons/info/gray.png')}
              resizeMode="contain"
              style={{
                maxWidth: RFValue(20),
                maxHeight: RFValue(20),
              }}
            />
          </View>
        </View>
        <View style={Spacing.bottomButtonsContainer}>
          <Button
            title={
              paymentType === 'recurring'
                ? 'Next Step: Select Dates'
                : 'Next Step: Select Date'
            }
            onPress={() =>
              navigation.navigate('SchedulePayment', {
                account,
                paymentType,
                paymentAmount: payment,
                months: paymentType === 'recurring' ? months : null,
              })
            }
          />
        </View>
      </SafeAreaView>
    </>
  );
};

export default PaymentCalculator;

const styles = StyleSheet.create({
  container: {
    ...Spacing.defaultContainer,
    justifyContent: 'flex-start',
  },
  accountWrap: {
    height: RFValue(60),
    borderWidth: 1,
    borderRadius: 5,
    borderColor: colors.lightGray,
    justifyContent: 'center',
    paddingHorizontal: 15,
    marginTop: 15,
    marginBottom: 30,
  },
  accountTitle: {
    fontFamily: 'Poppins-Regular',
    fontSize: RFValue(12),
    letterSpacing: 1.25,
    color: colors.darkGreen,
  },
  balanceText: {
    fontFamily: 'Poppins-Bold',
    color: colors.darkGreen,
    fontSize: RFValue(17),
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignContent: 'center',
    alignItems: 'center',
  },
  bottomButtonsContainer: {
    flex: 1,
    paddingHorizontal: 15,
    justifyContent: 'flex-end',
    marginBottom: 10,
  },
});
