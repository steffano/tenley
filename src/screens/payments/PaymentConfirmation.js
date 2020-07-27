import React, {useContext, useState} from 'react';
import {SafeAreaView, Text, View, StyleSheet, Image} from 'react-native';
import {colors, Spacing} from '../../utilities/styles';
import {GlobalContext} from '../../GlobalContext';
import {Button} from '../../components/Button';
import {ScreenHeader} from '../../components/ScreenHeader';
import Bullet from '../../components/Bullet';
import apis from '../../apis/';

import {RFValue, RFPercentage} from 'react-native-responsive-fontsize';
import currency from 'currency.js';
import moment from 'moment';

const PaymentConfirmation = ({navigation, route}) => {
  const {
    paymentType,
    account,
    paymentAmount,
    months,
    paymentDate,
    frequency,
  } = route.params;
  const [globalData, setGlobalData] = useContext(GlobalContext);

  const accountTotal = currency(account.amountOwed).value;
  const [payment, setPayment] = useState(accountTotal * 0.6);

  const toUSD = value => currency(value, {symbol: '$', precision: 0}).format();

  const oneTimePayment = {
    paymentAmount,
    tenleyBucksApplied: 10,
    // date: paymentDate,
  };

  const recurringPayment = {
    strategy: 'weekly',
    paymentAmount: '$300',
    params: {day: 4},
  };

  const {session} = globalData;
  const jwt = session.accessToken.jwtToken;

  const handlePaymentConfirm = async () => {
    if (paymentType === 'recurring') {
      try {
        const paymentSuccess = await apis.schedulePayments(
          recurringPayment,
          jwt,
          account.accountID,
        );
        if (paymentSuccess) {
          // getAccounts();
          console.log(paymentSuccess);
        }
      } catch (error) {
        console.log(error.message);
      }
    } else {
      try {
        const paymentSuccess = await apis.oneTimePayment(
          oneTimePayment,
          jwt,
          account.accountID,
        );
        if (paymentSuccess) {
          // getAccounts();
          console.log(paymentSuccess);
        }
      } catch (error) {
        console.log(error.message);
      }
    }
  };

  const getAccounts = async () => {
    console.log('made it');
    const accts = await apis.getAccounts(jwt);
    setGlobalData({
      ...globalData,
      accounts: accts.data.with,
    });
    // switchScreen();
  };

  const switchScreen = () => {
    navigation.reset({
      index: 0,
      routes: [{name: 'Accounts', params: 'fromImportLoading'}],
    });
  };

  const frequencyName =
    frequency === 'twiceMonthlyByDate'
      ? 'Twice Monthly'
      : frequency === 'twiceWeekly'
      ? 'Biweekly'
      : frequency === 'monthlyByDate'
      ? 'Monthly'
      : frequency === 'everyNWeeks'
      ? 'Every 4 Weeks'
      : null;

  return (
    <>
      <SafeAreaView style={styles.container}>
        <ScreenHeader title={'Confirmation'} navigation={navigation} />
        <View style={styles.container}>
          <View style={{paddingHorizontal: 15, marginTop: 15}}>
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

          <View style={{paddingHorizontal: 15}}>
            <Text
              style={{
                fontFamily: 'Poppins-Regular',
                fontSize: RFValue(11),
                letterSpacing: 1.25,
                marginVertical: 20,
              }}>
              PAYMENT TERMS SUMMARY
            </Text>
            <View style={styles.row}>
              <Text style={styles.rowText}>Payment Amount</Text>
              <Text style={styles.rowTextBold}>{toUSD(paymentAmount)}</Text>
            </View>
            {paymentType === 'recurring' && (
              <>
                <View style={styles.rowSeparator} />
                <View style={styles.row}>
                  <Text style={styles.rowText}>Payment Timeline</Text>
                  <Text style={styles.rowTextBold}>{months} Months</Text>
                </View>
              </>
            )}
            <View style={styles.rowSeparator} />
            <View style={styles.row}>
              <Text style={styles.rowText}>
                Payment {paymentType === 'recurring' ? 'Start ' : null}Date
              </Text>
              <Text style={styles.rowTextBold}>
                {moment(paymentDate).format('MMMM Do, YYYY')}
              </Text>
            </View>
            <View style={styles.rowSeparator} />
            <View style={styles.row}>
              <Text style={styles.rowText}>Frequency</Text>
              <Text style={styles.rowTextBold}>
                {paymentType === 'oneTime' ? 'One Time' : frequencyName}
              </Text>
            </View>
            <View style={styles.rowSeparator} />
            <View style={styles.row}>
              <Text style={styles.rowText}>Bank</Text>
              <Text style={styles.rowTextBold}>Citibank - 1111</Text>
            </View>
          </View>

          <View
            style={{
              marginVertical: 50,
              borderBottomWidth: 1,
              borderColor: colors.lightGray,
            }}
          />
        </View>
        <View style={Spacing.bottomButtonsContainer}>
          <Button title="Complete" onPress={() => handlePaymentConfirm()} />
        </View>
      </SafeAreaView>
    </>
  );
};

export default PaymentConfirmation;

const styles = StyleSheet.create({
  container: {
    ...Spacing.defaultContainer,
    justifyContent: 'flex-start',
  },
  accountWrap: {
    height: 60,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: colors.lightGray,
    justifyContent: 'center',
    paddingHorizontal: 15,
    marginVertical: 15,
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
  rowText: {
    fontFamily: 'Poppins-Regular',
    color: colors.darkGreen,
    fontSize: RFValue(11),
    letterSpacing: 0.75,
  },
  rowTextBold: {
    fontFamily: 'Poppins-Bold',
    color: colors.darkGreen,
    fontSize: RFValue(11),
    letterSpacing: 0.75,
  },
  rowSeparator: {
    height: 1,
    backgroundColor: colors.lightGray,
    marginVertical: 10,
  },
  contentBlock: {
    maxHeight: RFPercentage(25),
    borderWidth: 1,
    borderColor: colors.lightGray,
    backgroundColor: 'white',
    marginHorizontal: 15,
    marginVertical: 10,
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 5,
  },
});
