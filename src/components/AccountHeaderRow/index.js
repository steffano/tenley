import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {RFValue} from 'react-native-responsive-fontsize';
import {colors} from '../../utilities/styles';
import currency from 'currency.js';

const AccountHeaderRow = ({account, showDecimal}) => {
  const toUSD = value =>
    currency(value, {symbol: '$', precision: showDecimal ? 2 : 0}).format();

  return (
    <>
      <View style={[styles.row, {marginBottom: RFValue(10)}]}>
        <View style={[styles.row, {alignItems: 'flex-start'}]}>
          <Text style={[styles.accountTitle, {maxWidth: RFValue(200)}]}>
            {account.originalCreditorName}
            {' \u2022 '}
            {account.originalCreditorAccountNumber.slice(-4)}
          </Text>
        </View>
        <View>
          <Text style={styles.balanceText}>{toUSD(account.amountOwed)}</Text>
        </View>
      </View>
    </>
  );
};

export default AccountHeaderRow;

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
    backgroundColor: 'yellow',
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
