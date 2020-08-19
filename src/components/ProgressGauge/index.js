import React from 'react';
import {View, StyleSheet, Text} from 'react-native';
import {colors} from '../../utilities/styles';
import {RFValue} from 'react-native-responsive-fontsize';
import currency from 'currency.js';
import moment from 'moment';

const ProgressLine = ({
  label,
  backgroundColor = '#e5e5e5',
  account,
  nextPayment,
  finalPayment,
  upcomingPayments,
  showDetails,
  tile,
}) => {
  const getWholePercent = (percentFor, percentOf) => {
    return Math.floor((percentFor / percentOf) * 100);
  };

  const balance = currency(account.amountOwed).value;
  const originalBalance = currency(account.originalAmountOwed).value;
  const settlements = account.settlements;
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

  return (
    <>
      {showDetails && (
        <View style={{padding: 5, marginBottom: RFValue(5)}}>
          <View
            style={[
              styles.row,
              {
                justifyContent: 'space-between',
              },
            ]}>
            <Text style={styles.rowText}>
              Est. Payoff: {moment.utc(finalPayment.date).format('MM.DD.YYYY')}
            </Text>

            <Text style={styles.rowText}>
              {tile
                ? `Next Payment: ${moment
                    .utc(nextPayment.date)
                    .format('MM.DD.YYYY')}`
                : `${upcomingPayments} payments to go`}
            </Text>
          </View>
        </View>
      )}
      <View
        style={[styles.progressVisualFull, {backgroundColor: backgroundColor}]}>
        <View style={styles.row}>
          {progressPercentages.map((item, index) => {
            return (
              <View
                key={index}
                style={{
                  height: 10,
                  width: item.percentage,
                  backgroundColor: item.color,
                  borderTopLeftRadius: index === 0 ? 100 : 0,
                  borderBottomLeftRadius: index === 0 ? 100 : 0,
                }}
              />
            );
          })}
        </View>
      </View>

      <View style={styles.rowLeft}>
        {/* {settlements.length > 0 && (
          <>
            <View style={styles.row}>
              <View style={styles.bullet} />
              <Text style={styles.rowText}>Settlement reduction</Text>
            </View>
            <View style={{width: 10}} />
          </>
        )} */}
        <View style={styles.row}>
          <View style={styles.bulletWrapper}>
            <View style={styles.bullet} />
          </View>
          <Text style={styles.rowText}>Your progress</Text>
        </View>
      </View>
    </>
  );
};

export default ProgressLine;

const styles = StyleSheet.create({
  progressVisualFull: {
    display: 'flex',
    alignSelf: 'center',
    width: '99%',
    height: 10,
    // margin: 10,
    borderRadius: 100,
  },
  rowText: {
    fontFamily: 'Poppins-Regular',
    color: colors.darkGreen,
    fontSize: RFValue(9),
    letterSpacing: 0.75,
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
    marginTop: RFValue(15),
  },
  bulletWrapper: {
    width: 20,
    height: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  bullet: {
    backgroundColor: colors.tenleyGreen,
    height: 10,
    width: 10,
    borderRadius: 20,
    paddingBottom: 5,
  },
});
