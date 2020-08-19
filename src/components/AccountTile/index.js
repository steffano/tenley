import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {RFValue, RFPercentage} from 'react-native-responsive-fontsize';
import {colors} from '../../utilities/styles';
import ProgressGauge from '../ProgressGauge';
import AccountHeaderRow from '../AccountHeaderRow';
import Bullet from '../Bullet';
import currency from 'currency.js';
import moment from 'moment';
import filter from 'lodash/filter';
import reject from 'lodash/reject';
import last from 'lodash/last';

const AccountTile = ({navigation, account, progressOnly}) => {
  const statusBlockStyle = [styles.statusBlock];
  const statusBlockText = [styles.offeredText];
  const containerStyle = [styles.accountContainer];

  const payments = account.payments;
  const settlements = account.settlements;
  const currentSettlement = settlements[0];

  const upcomingPayments = filter(account.payments, ['status', 'SCHEDULED']);
  const postedPayments = filter(account.payments, ['status', 'POSTED']);
  const nextPayment = upcomingPayments[0];
  const finalPayment = last(upcomingPayments);
  const recentPayment = account.payments[0];

  if (settlements.length !== 0) {
    if (currentSettlement.status === 'OFFERED') {
      statusBlockStyle.push(styles.offered);
    }
    if (settlements.status === 'ACCEPTED') {
      statusBlockStyle.push(styles.accepted);
    }
    if (settlements.status === 'COUNTERED') {
      statusBlockStyle.push(styles.countered);
    }
  }
  if (payments.length > 0) {
    if (payments[0].status === 'FAILED') {
      containerStyle.push(styles.failedPayment);
    }
  }
  if (progressOnly) {
    containerStyle.push(styles.progressOnly);
  }

  const toUSD = value => currency(value, {symbol: '$', precision: 0}).format();

  const balance = currency(account.amountOwed).value;
  const originalBalance = currency(account.originalAmountOwed).value;

  const hasPaymentSchedule =
    reject(upcomingPayments, ['type', 'ONE-TIME']).length !== 0;

  return (
    <>
      <TouchableOpacity
        activeOpacity={progressOnly ? 100 : null}
        onPress={
          progressOnly
            ? null
            : () => navigation.navigate('Account Details', {account})
        }
        style={containerStyle}>
        <View style={styles.detailWrap}>
          {!progressOnly && (
            <>
              <AccountHeaderRow account={account} />

              <View style={styles.row}>
                <View style={statusBlockStyle}>
                  {settlements.length !== 0 && (
                    <Text style={statusBlockText}>
                      {currentSettlement.offer} OFFER SUBMITTED
                    </Text>
                  )}
                </View>

                <View>
                  <View>
                    {payments.length <= 0 && (
                      <Text style={styles.linkText}>
                        {'\n'}
                        VIEW >
                      </Text>
                    )}
                  </View>
                </View>
              </View>
            </>
          )}

          {postedPayments.length > 0 && (
            <>
              <ProgressGauge
                tile
                account={account}
                showDetails={hasPaymentSchedule}
                nextPayment={nextPayment || null}
                finalPayment={finalPayment || null}
              />
            </>
          )}
        </View>

        {payments.length !== 0 && (
          <View style={{backgroundColor: colors.lightestGray}}>
            <View style={styles.detailWrap}>
              <View style={styles.row}>
                {postedPayments.length === 0 && upcomingPayments.length > 0 ? (
                  <>
                    <Text style={styles.text}>
                      First payment of{' '}
                      <Text style={styles.boldGreen}>
                        {toUSD(nextPayment.amount)}{' '}
                      </Text>
                      on{' '}
                      <Text style={styles.bold}>
                        {moment.utc(nextPayment.date).format('MM.DD.YYYY')}
                      </Text>
                    </Text>
                  </>
                ) : (
                  <>
                    <Text style={styles.text}>
                      Original Balance{' '}
                      <Text style={styles.bold}>{toUSD(originalBalance)}</Text>{' '}
                      | Paid{' '}
                      <Text style={styles.bold}>
                        {toUSD(originalBalance - balance)}
                      </Text>
                    </Text>
                  </>
                )}

                <View>
                  <Text style={styles.linkText}>VIEW ></Text>
                </View>
              </View>
            </View>
          </View>
        )}

        {/* FAILED PAYMENT
        {payments && (
          <View
            style={{
              minWidth: 200,
              backgroundColor:
                payments[0].status === 'FAILED'
                  ? colors.darkRed
                  : colors.lightestGray,
            }}>
            <TouchableOpacity>
              <View style={styles.detailWrap}>
                <View style={styles.row}>
                  <Text style={[styles.text, styles.bold, {color: 'white'}]}>
                    Payment failed
                  </Text>
                  <Text style={[styles.linkText, {color: 'white'}]}>
                    VIEW >
                  </Text>
                </View>
              </View>
            </TouchableOpacity>
          </View>
        )} */}
      </TouchableOpacity>
    </>
  );
};

export default AccountTile;

const styles = StyleSheet.create({
  text: {
    fontFamily: 'Poppins-Regular',
    color: colors.darkGreen,
    fontSize: RFValue(10),
    letterSpacing: 0.5,
    justifyContent: 'center',
  },
  detailWrap: {
    padding: RFValue(10),
    alignContent: 'center',
  },
  bold: {
    fontFamily: 'Poppins-Bold',
  },
  boldGreen: {
    color: colors.mediumGreen,
    fontFamily: 'Poppins-Bold',
  },
  rowText: {
    fontFamily: 'Poppins-Regular',
    color: colors.darkGreen,
    fontSize: RFValue(9),
    letterSpacing: 0.75,
  },
  rowTextBold: {
    fontFamily: 'Poppins-Bold',
    color: colors.darkGreen,
    fontSize: RFValue(9),
    letterSpacing: 0.75,
  },
  accountContainer: {
    borderColor: colors.lightGray,
    borderWidth: 2,
    flex: 1,
    minWidth: 200,
    marginHorizontal: RFValue(15),
    marginVertical: RFValue(10),
    borderRadius: 5,
  },
  progressOnly: {
    borderWidth: 0,
    marginHorizontal: 0,
    marginVertical: 0,
    borderRadius: 0,
    // backgroundColor: 'red',
  },
  failedPayment: {
    borderColor: colors.darkRed,
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
  offered: {
    alignSelf: 'flex-end',
    borderRadius: 3,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.lightGreen,
    height: RFValue(30),
    letterSpacing: 0.5,
    paddingHorizontal: RFValue(10),
    marginTop: RFValue(10),
  },
  offeredText: {
    fontFamily: 'Poppins-Regular',
    textAlign: 'center',
    color: '#00623B',
    letterSpacing: 0.75,
    fontSize: RFValue(10),
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
  linkText: {
    fontSize: RFValue(10),
    alignSelf: 'flex-end',
    fontFamily: 'Poppins-Bold',
    letterSpacing: 1.5,
    color: colors.mediumGreen,
    padding: 5,
  },
  statusBlock: {
    height: 0,
  },
});
