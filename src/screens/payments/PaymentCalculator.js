import React, {useContext, useState} from 'react';
import {
  SafeAreaView,
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
} from 'react-native';
import {GlobalContext} from '../../GlobalContext';
import {Button} from '../../components/Button';
import {ScreenHeader} from '../../components/ScreenHeader';
import AccountTile from '../../components/AccountTile';
import currency from 'currency.js';
import Slider from '../../components/Calculator/Slider';
import RNPickerSelect from 'react-native-picker-select';

import {colors, Spacing} from '../../utilities/styles';
import {RFValue} from 'react-native-responsive-fontsize';

const PaymentCalculator = ({navigation, route}) => {
  const paymentType = route.params.paymentType;
  const account = route.params.account;
  const [globalData, setGlobalData] = useContext(GlobalContext);

  const user = globalData.user;

  const accountTotal = currency(account.amountOwed).value;

  const [months, setMonths] = useState(12);
  const [payment, setPayment] = useState(
    paymentType === 'recurring'
      ? Math.ceil(accountTotal / months)
      : accountTotal,
  );
  const [withdrawalAccount, setWithdrawalAccount] = useState(
    user['custom:demo_bankAcct'] || null,
  );

  const updatePayment = val => {
    setPayment(val);
    setMonths(Math.ceil(accountTotal / val));
  };

  const updateMonths = val => {
    setMonths(Math.ceil(val));
    setPayment(Math.ceil(accountTotal / val / 10) * 10);
  };

  const toUSD = value => currency(value, {symbol: '$', precision: 0}).format();

  const pickerData = [
    {
      label: 'CitiBank - 1111',
      value: 'CitiBank - 1111',
    },
  ];

  console.log(accountTotal, months, payment);
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
                  <Text style={[styles.accountTitle, {maxWidth: 250}]}>
                    {account.originalCreditorName}
                    {' \u2022 '}
                    {account.originalCreditorAccountNumber.slice(-4)}
                  </Text>
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
                isPayment={true}
              />
            ) : (
              <>
                <View>
                  <Slider
                    min={Math.ceil(accountTotal / 36 / 10) * 10}
                    max={accountTotal}
                    total={payment}
                    onSlide={updatePayment}
                    isCurrency
                    title={'Payment Amount'}
                    isPayment={true}
                  />
                  <View style={{height: RFValue(30)}} />

                  <Slider
                    min={1}
                    max={36}
                    total={months}
                    onSlide={updateMonths}
                    title={'Payments to Payoff'}
                    isPayment={true}
                  />
                </View>
              </>
            )}
          </View>
          {withdrawalAccount && (
            <>
              <View>
                <View
                  style={[
                    styles.row,
                    {marginTop: RFValue(20), paddingHorizontal: RFValue(20)},
                  ]}>
                  <Text style={styles.tinyText}>Withdrawal Account</Text>
                </View>

                <RNPickerSelect
                  pickerProps={{
                    style: {
                      height: 200,
                      overflow: 'hidden',
                    },
                  }}
                  placeholder={{}}
                  onDonePress={console.log(withdrawalAccount)}
                  doneText={'Done'}
                  onValueChange={value => setWithdrawalAccount(value)}
                  items={pickerData}
                  useNativeAndroidPickerStyle={false}
                  style={{
                    inputIOS: [styles.input],
                    inputAndroid: {
                      fontFamily: 'Poppins-Regular',
                      fontSize: RFValue(13),
                    },
                    inputAndroidContainer: [styles.input],
                    placeholder: {
                      fontFamily: 'Poppins-Regular',
                      color: '#666666',
                      fontSize: RFValue(13),
                    },
                    iconContainer: {
                      top: 33,
                      right: 50,
                    },
                  }}
                  Icon={() => {
                    return (
                      <Image
                        source={require('../../assets/icons/carat.png')}
                        resizeMode="contain"
                        style={{
                          height: 15,
                          width: 15,
                          transform: [{rotate: '90deg'}],
                        }}
                      />
                    );
                  }}
                />
                <TouchableOpacity>
                  <Text
                    style={[
                      styles.tinyText,
                      {
                        paddingHorizontal: RFValue(20),
                        color: colors.mediumGreen,
                        textDecorationLine: 'underline',
                      },
                    ]}>
                    Add new payment method
                  </Text>
                </TouchableOpacity>
              </View>
            </>
          )}
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
              source={require('../../assets/icons/checkmark/empty.png')}
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
              Apply Tenley Bucks to this payment{'  '}
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
        <View
          style={[Spacing.bottomButtonsContainer, {maxHeight: RFValue(100)}]}>
          {paymentType === 'recurring' ? (
            <Button
              title={
                paymentType === 'recurring'
                  ? 'Next Step: Select Dates'
                  : 'Select Date'
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
          ) : (
            <>
              {!withdrawalAccount ? (
                <Button
                  title="Pay Now"
                  onPress={() =>
                    navigation.navigate('BankSetup', {
                      account,
                      paymentType,
                      paymentAmount: payment,
                      months: paymentType === 'recurring' ? months : null,
                      frequency: 'oneTime',
                    })
                  }
                />
              ) : (
                <Button
                  title="Pay Now"
                  onPress={() =>
                    navigation.navigate('PaymentConfirmation', {
                      account,
                      paymentType,
                      paymentAmount: payment,
                      months: paymentType === 'recurring' ? months : null,
                      frequency: 'oneTime',
                    })
                  }
                />
              )}
            </>
          )}
          {paymentType === 'oneTime' && (
            <Button
              textOnly
              title={'Select a date'}
              onPress={() =>
                navigation.navigate('SchedulePayment', {
                  account,
                  paymentType,
                  paymentAmount: payment,
                  months: paymentType === 'recurring' ? months : null,
                })
              }
            />
          )}
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
  input: {
    borderRadius: RFValue(5),
    marginHorizontal: RFValue(15),
    marginVertical: RFValue(10),
    paddingHorizontal: RFValue(15),
    justifyContent: 'center',
    color: colors.darkGreen,
    fontFamily: 'Poppins-Regular',
    fontSize: RFValue(13),
    letterSpacing: 0.8,
    borderColor: colors.lightGray,
    height: RFValue(45),
    borderWidth: 1,
  },
  tinyText: {
    fontFamily: 'Poppins-Regular',
    fontSize: RFValue(10),
    letterSpacing: 1.25,
  },
});
