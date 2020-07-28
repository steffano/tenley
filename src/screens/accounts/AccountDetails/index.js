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
import Bullet from '../../../components/Bullet';
import {ScreenHeader} from '../../../components/ScreenHeader';
import ProgressGauge from '../../../components/ProgressGauge';
import {RFValue, RFPercentage} from 'react-native-responsive-fontsize';
import currency from 'currency.js';
import moment from 'moment';
import filter from 'lodash/filter';
import last from 'lodash/last';

const AccountDetails = ({route, navigation}) => {
  const account = route.params.account;

  const settlements = account.settlements;
  const currentSettlement = settlements[0];
  console.log(currentSettlement);

  const toUSD = value => currency(value, {symbol: '$', precision: 2}).format();

  const getWholePercent = (percentFor, percentOf) => {
    return Math.floor((percentFor / percentOf) * 100);
  };

  const balance = currency(account.amountOwed).value;
  const originalBalance = currency(account.originalAmountOwed).value;

  const settlementBalance = 0;

  const paid = originalBalance - balance;
  const settled = 0;

  const percentPaid = getWholePercent(paid, originalBalance);
  const percentSaved = getWholePercent(settled, originalBalance);

  const progressPercentages = [
    // {
    //   label: 'settlement',
    //   percentage: percentSaved + '%',
    //   color: colors.mediumGreen,
    // },
    {
      label: 'payments',
      percentage: percentPaid + '%',
      color: colors.tenleyGreen,
    },
  ];

  console.log(account.payments);

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

  return (
    <>
      <SafeAreaView style={styles.container}>
        <ScreenHeader title={'Account Details'} navigation={navigation} />
        <ScrollView>
          <View style={styles.contentBlock}>
            {account.payments.length === 0 ? (
              <View style={styles.contentWrap}>
                <View style={[styles.row, {marginBottom: 15}]}>
                  <View style={[styles.row, {alignItems: 'center'}]}>
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
                {renderRow(
                  'Account Number',
                  account.originalCreditorAccountNumber,
                )}
                {renderRow(
                  'Date Opened',
                  moment(account.openDate).format('MMMM Do, YYYY'),
                )}
                {renderRow('Status', account.status)}
              </View>
            ) : (
              <>
                <View style={styles.contentWrap}>
                  <View style={[styles.row, {marginBottom: 15}]}>
                    <View style={[styles.row, {alignItems: 'center'}]}>
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

                  {renderRow(
                    'Original Balance',
                    toUSD(account.originalAmountOwed),
                  )}
                  {renderRow(
                    'Account Number',
                    account.originalCreditorAccountNumber,
                  )}
                  {renderRow(
                    'Date Opened',
                    moment(account.openDate).format('MMMM Do, YYYY'),
                  )}
                  {renderRow('Status', account.status)}
                </View>

                <View
                  style={{paddingHorizontal: RFValue(20), marginBottom: 15}}>
                  {upcomingPayments.length > 0 && (
                    <View style={styles.row}>
                      <Text style={styles.rowText}>
                        Est. Payoff:{' '}
                        {moment(finalPayment.date).format('MM.DD.YYYY')}
                      </Text>
                      <Text style={styles.rowTextBold}>
                        {upcomingPayments.length} payments to go
                      </Text>
                    </View>
                  )}

                  <View>
                    <ProgressGauge
                      backgroundColor="lightgrey"
                      visualParts={progressPercentages}
                    />
                    <View style={styles.rowLeft}>
                      <View style={styles.row}>
                        <Bullet color={colors.mediumGreen} />
                        <Text style={styles.text}>Settlement reduction</Text>
                      </View>
                      <View style={{width: 10}} />
                      <View style={styles.row}>
                        <Bullet color={colors.tenleyGreen} />
                        <Text style={styles.text}>Your progress</Text>
                      </View>
                    </View>
                  </View>
                </View>

                {upcomingPayments.length > 0 ? (
                  <View style={{backgroundColor: colors.lightestGray}}>
                    <View style={styles.contentWrap}>
                      <Text
                        style={[styles.text, {paddingVertical: RFValue(5)}]}>
                        Next payment of{' '}
                        <Text style={styles.boldGreen}>
                          {nextPayment.amount}{' '}
                        </Text>
                        on {moment(nextPayment.date).format('MM.DD.YYYY')}
                      </Text>
                    </View>
                  </View>
                ) : (
                  <View style={{backgroundColor: colors.lightestGray}}>
                    <View style={styles.contentWrap}>
                      <Text
                        style={[styles.text, {paddingVertical: RFValue(5)}]}>
                        Last payment of{' '}
                        <Text style={styles.boldGreen}>
                          {recentPayment.amount}{' '}
                        </Text>
                        processed on{' '}
                        {moment(recentPayment.date).format('MM.DD.YYYY')}
                      </Text>
                    </View>
                  </View>
                )}
              </>
            )}
          </View>

          {currentSettlement && (
            <View>
              <View
                style={{
                  marginTop: 20,
                  paddingHorizontal: 30,
                }}>
                <View style={styles.row}>
                  <Text style={styles.tinyText}>SETTLEMENT DETAILS</Text>
                  <Image
                    source={require('../../../assets/icons/menu.png')}
                    resizeMode="contain"
                    style={{maxWidth: 20, maxHeight: 10}}
                  />
                </View>
              </View>
              <View style={styles.settlementBlock}>
                <View style={styles.row}>
                  <View style={styles.row}>
                    <Text style={styles.accountTitle}>
                      Your settlement offer
                    </Text>
                  </View>
                  <View style={{alignContent: 'center'}}>
                    <Text style={styles.balanceText}>
                      {toUSD(currentSettlement.offer)}
                    </Text>
                  </View>
                </View>
              </View>
              <View style={[styles.row, {justifyContent: 'center'}]}>
                <Image
                  source={require('../../../assets/icons/clock.png')}
                  resizeMode="contain"
                  style={{maxWidth: 20, maxHeight: 20}}
                />
                <Text style={styles.rowText}>
                  {'  '} Currently pending creditor response
                </Text>
              </View>
            </View>
          )}

          {!currentSettlement && account.payments.length === 0 && (
            <>
              <View style={styles.contentBlock}>
                <View style={styles.contentWrap}>
                  <Text style={styles.blockText}>
                    Set up a payment plan or make a {'\n'}single payment now to
                    see the most improvement to your credit score.{'  '}
                    <Image
                      style={{
                        width: RFValue(15),
                        height: RFValue(15),
                      }}
                      resizeMode="contain"
                      source={require('../../../assets/icons/info/gray.png')}
                    />
                  </Text>

                  <Button
                    title="Payment Set Up"
                    onPress={() =>
                      navigation.navigate('PaymentSetup', {account})
                    }
                  />
                </View>
              </View>
              <View style={styles.contentBlock}>
                <View style={styles.contentWrap}>
                  <Text style={styles.blockText}>
                    Negotiate a settlement with your {'\n'}creditor or debt
                    collector to lower your account's total debt.{'  '}
                    <Image
                      style={{
                        width: RFValue(15),
                        height: RFValue(15),
                      }}
                      resizeMode="contain"
                      source={require('../../../assets/icons/info/gray.png')}
                    />
                  </Text>
                  <Button
                    secondary
                    title="Negotiate a Settlement"
                    onPress={() =>
                      navigation.navigate('Settlement Negotiation', {account})
                    }
                  />
                </View>
              </View>
            </>
          )}
        </ScrollView>

        {account.payments.length > 0 && (
          <View style={Spacing.bottomButtonsContainer}>
            <Button title="Make a Payment" />
          </View>
        )}
      </SafeAreaView>
    </>
  );
};

export default AccountDetails;

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
    marginVertical: 5,
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
