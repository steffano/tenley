import React, {useContext, useState} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {RFValue, RFPercentage} from 'react-native-responsive-fontsize';
import {colors} from '../../utilities/styles';
import ProgressGauge from '../ProgressGauge';
import Bullet from '../Bullet';
import currency from 'currency.js';

const AccountTile = ({navigation, account, hideButton}) => {
  const statusBlockStyle = [styles.statusBlock];
  const statusBlockText = [styles.offeredText];

  const containerStyle = [styles.accountContainer];

  const settlements = account.settlements;
  const currentSettlement = settlements[0];

  if (settlements.length !== 0) {
    // console.log(settlements, '####');
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

  const payments = account.payments;

  if (payments) {
    if (payments[0].status === 'FAILED') {
      containerStyle.push(styles.failedPayment);
    }
  }

  const toUSD = value => currency(value, {symbol: '$', precision: 0}).format();

  return (
    <>
      <View style={containerStyle}>
        <View style={styles.detailWrap}>
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

          <View style={styles.row}>
            <View style={statusBlockStyle}>
              {settlements.length !== 0 && (
                <Text style={statusBlockText}>
                  {currentSettlement.offer} OFFER SUBMITTED
                </Text>
              )}
            </View>

            <View>
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate('Account Details', {account})
                }>
                {!payments && (
                  <Text style={styles.linkText}>
                    {'\n'}
                    VIEW >
                  </Text>
                )}
              </TouchableOpacity>
            </View>
          </View>
          {payments && (
            <>
              <View style={styles.row}>
                <Text style={styles.text}>Est. Payoff: 1.21.22</Text>
                <Text style={styles.text}>Next Payment: 10.21.20</Text>
              </View>
              <View>
                <ProgressGauge
                  label="Two visual percentages"
                  backgroundColor="lightgrey"
                  visualParts={[
                    {
                      percentage: '53%',
                      color: colors.mediumGreen,
                    },
                    {
                      percentage: '13%',
                      color: colors.tenleyGreen,
                    },
                  ]}
                />
                <View
                  style={{flexDirection: 'row', justifyContent: 'flex-start'}}>
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
            </>
          )}
        </View>
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
                {payments && payments[0].status !== 'FAILED' ? (
                  <View style={styles.row}>
                    <Text style={styles.text}>
                      Original Balance <Text style={styles.bold}>$6,250</Text> |
                      Paid <Text style={styles.bold}>$650</Text>
                    </Text>
                    <Text style={styles.linkText}>VIEW ></Text>
                  </View>
                ) : (
                  <View style={styles.row}>
                    <Text style={[styles.text, styles.bold, {color: 'white'}]}>
                      Payment failed
                    </Text>
                    <Text style={[styles.linkText, {color: 'white'}]}>
                      VIEW >
                    </Text>
                  </View>
                )}
              </View>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </>
  );
};

export default AccountTile;

const styles = StyleSheet.create({
  text: {
    fontFamily: 'Poppins-Regular',
    color: colors.darkGreen,
    fontSize: RFValue(11),
    letterSpacing: 0.5,
    justifyContent: 'center',
  },
  detailWrap: {
    padding: 15,
    alignContent: 'center',
  },
  bold: {
    fontFamily: 'Poppins-Bold',
  },
  accountContainer: {
    borderColor: colors.lightGray,
    borderWidth: 2,
    flex: 1,
    minWidth: 200,
    marginHorizontal: 15,
    marginVertical: 5,
    borderRadius: 5,
    // paddingTop: 15,
  },
  failedPayment: {
    borderColor: colors.darkRed,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignContent: 'center',
    alignItems: 'center',
    // paddingHorizontal: 20,
  },
  offered: {
    alignSelf: 'flex-end',
    borderRadius: 3,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.lightGreen,
    height: 30,
    // width: 150,
    letterSpacing: 0.5,
    paddingHorizontal: 10,
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
  },
  statusBlock: {
    // alignSelf: 'flex-end',
    // borderRadius: 3,
    // justifyContent: 'center',
    // alignItems: 'center',
    // backgroundColor: colors.mediumGreen,
    // height: 30,
    // width: 150,
    // letterSpacing: 0.5,
  },
});
