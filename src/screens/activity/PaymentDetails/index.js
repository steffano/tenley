import React, {useContext} from 'react';
import {
  SafeAreaView,
  Text,
  View,
  StyleSheet,
  Image,
  ScrollView,
} from 'react-native';
import {colors, Spacing, Typography} from '../../../utilities/styles';
import {Button} from '../../../components/Button';
import {ScreenHeader} from '../../../components/ScreenHeader';
import ProgressGauge from '../../../components/ProgressGauge';
import {RFValue, RFPercentage} from 'react-native-responsive-fontsize';
import currency from 'currency.js';
import moment from 'moment';
import filter from 'lodash/filter';
import last from 'lodash/last';

const PaymentDetails = ({route, navigation}) => {
  const {account, payment, index, type} = route.params;

  const settlements = account.settlements;
  const currentSettlement = settlements[0];
  console.log(index);

  const toUSD = value => currency(value, {symbol: '$', precision: 2}).format();

  const upcomingPayments = filter(account.payments, ['status', 'SCHEDULED']);
  const nextPayment = upcomingPayments[0];
  const finalPayment = last(upcomingPayments);
  const recentPayment = account.payments[0];

  console.log(upcomingPayments, finalPayment);

  const renderRow = (rowTitle, rowValue) => {
    return (
      <>
        <View style={styles.row}>
          <Text style={styles.rowText}>{rowTitle}</Text>
          <Text style={styles.rowTextBold}>{rowValue}</Text>
        </View>
        <View style={styles.rowSeparator} />
      </>
    );
  };

  const frequencyName =
    payment.type === 'TWICE_MONTHLY_BY_DATE'
      ? 'Twice Monthly'
      : payment.type === 'TWICE_WEEKLY'
      ? 'Biweekly'
      : payment.type === 'WEEKLY'
      ? 'Weekly'
      : payment.type === 'MONTHLY_BY_DATE'
      ? 'Monthly'
      : payment.type === 'EVERY_N_WEEKS'
      ? 'Every 2 Weeks'
      : payment.type === 'ONE-TIME'
      ? 'One time'
      : null;

  return (
    <>
      <SafeAreaView style={styles.container}>
        <ScreenHeader title={'Payment Details'} navigation={navigation} />
        <ScrollView>
          <View style={styles.contentBlock}>
            <View style={styles.contentWrap}>
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
          </View>

          <View style={styles.contentWrap}>
            <Text style={styles.tinyText}>PAYMENT TERMS SUMMARY</Text>
            {renderRow('Payment Amount', toUSD(payment.amount))}
            {renderRow(
              'Payment Date',
              moment(payment.date).format('MMMM Do, YYYY'),
            )}
            {payment.type !== 'ONE-TIME' && (
              <>{renderRow('Payment Timeline', payment.status)}</>
            )}
            {renderRow('Frequency', frequencyName)}
            {renderRow('Withdrawal Bank', 'CitiBank - 1111')}
          </View>
        </ScrollView>

        {account.payments.length > 0 && (
          <>
            <View style={{flexDirection: 'row'}}>
              <View style={Spacing.bottomButtonsContainer}>
                <Button
                  title="Pay Now"
                  onPress={() =>
                    type === 'past'
                      ? navigation.navigate('PaymentSetup', {account})
                      : null
                  }
                />
              </View>
              {payment.status === 'SCHEDULED' && (
                <View style={Spacing.bottomButtonsContainer}>
                  <Button secondary title="Edit Details" />
                </View>
              )}
            </View>
            {type === 'upcoming' && (
              <Button
                textOnly
                title="Cancel Payment"
                style={{marginTop: -10}}
              />
            )}
          </>
        )}
      </SafeAreaView>
    </>
  );
};

export default PaymentDetails;

const styles = StyleSheet.create({
  container: {
    ...Spacing.defaultContainer,
  },
  blockText: {
    ...Typography.subheaderText,
    fontSize: RFValue(12),
    textAlign: 'left',
    marginBottom: RFValue(10),
    marginTop: 3,
  },
  text: {
    fontFamily: 'Poppins-Regular',
    color: colors.darkGreen,
    fontSize: RFValue(10),
    letterSpacing: 0.5,
    justifyContent: 'center',
  },
  rowText: {
    fontFamily: 'Poppins-Regular',
    color: colors.darkGreen,
    fontSize: RFValue(10),
    letterSpacing: 0.75,
  },
  rowSeparator: {
    height: 1,
    backgroundColor: colors.lightGray,
    marginVertical: 7,
  },
  contentBlock: {
    borderWidth: 1,
    borderColor: colors.lightGray,
    backgroundColor: 'white',
    marginHorizontal: 15,
    marginVertical: 10,
    borderRadius: 5,
  },
  contentWrap: {
    paddingVertical: 10,
    paddingHorizontal: 15,
  },
  accountTitle: {
    fontFamily: 'Poppins-Regular',
    fontSize: RFValue(12),
    letterSpacing: 0.88,
    color: colors.darkGreen,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignContent: 'center',
    alignItems: 'center',
  },
  rowLeft: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  balanceText: {
    fontFamily: 'Poppins-Bold',
    color: colors.darkGreen,
    fontSize: RFValue(16),
  },
  rowTextBold: {
    fontFamily: 'Poppins-Bold',
    color: colors.darkGreen,
    fontSize: RFValue(11),
    letterSpacing: 0.75,
  },
  tinyText: {
    fontFamily: 'Poppins-Regular',
    fontSize: RFValue(10),
    letterSpacing: 1.25,
    marginVertical: RFValue(20),
  },
  settlementBlock: {
    backgroundColor: colors.lightestGray,
    flex: 1,
    minWidth: 200,
    marginHorizontal: 15,
    marginVertical: 10,
    borderRadius: 5,
    padding: 15,
  },
  boldGreen: {
    color: colors.mediumGreen,
    fontFamily: 'Poppins-Bold',
  },
});
