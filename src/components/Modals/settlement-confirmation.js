import React from 'react';
import {View, SafeAreaView, Text, StyleSheet, Image} from 'react-native';
import {Button} from '../Button';
import {colors, Spacing, Typography} from '../../utilities/styles';
import {RFValue, RFPercentage} from 'react-native-responsive-fontsize';
import find from 'lodash/find';
import currency from 'currency.js';

const SettlementConfirmation = ({
  onAccept,
  onClose,
  settlement,
  nextAccount,
}) => {
  const toUSD = value => currency(value, {symbol: '$', precision: 0}).format();

  console.log(settlement);
  return (
    <SafeAreaView style={styles.modalWrap}>
      <View style={{padding: 15, marginTop: 20}}>
        <Text style={[styles.header, {textAlign: 'center'}]}>
          Your offer has been sent!
        </Text>
        <View style={{height: 20}} />

        <Text style={styles.bodyText}>
          You've just submitted your first offer of {settlement}. We'll let you
          know if your offer is accepted or is countered.
        </Text>
        <View style={{height: 20}} />

        <View style={[styles.row, {justifyContent: 'flex-start'}]}>
          <Text style={styles.header}>You have 2 remaining counters{'  '}</Text>
          <Image
            source={require('../../assets/icons/info/gray.png')}
            resizeMode="contain"
            style={{
              maxWidth: RFValue(18),
              maxHeight: RFValue(18),
            }}
          />
        </View>
      </View>
      <View
        style={{
          height: 1,
          backgroundColor: colors.lightGray,
          marginVertical: 5,
        }}
      />

      <View style={{padding: 15}}>
        {nextAccount ? (
          <>
            <Text style={styles.bodyText}>
              It looks like there is another account you haven't looked at yet.
              Would you like to view the payment options for your{' '}
              {nextAccount.originalCreditorName} account?
            </Text>

            <View style={styles.accountWrap}>
              <View style={styles.row}>
                <View style={[styles.row, {alignItems: 'flex-start'}]}>
                  <Text style={[styles.accountTitle, {maxWidth: 175}]}>
                    {nextAccount.originalCreditorName}
                    {' \u2022 '}
                    {nextAccount.originalCreditorAccountNumber.slice(-4)}
                  </Text>
                </View>
                <View>
                  <Text style={styles.balanceText}>
                    {toUSD(nextAccount.amountOwed)}
                  </Text>
                </View>
              </View>
            </View>

            <View>
              <Button title="View Account" onPress={onAccept} />
              <Button textOnly title="NOT RIGHT NOW" onPress={onClose} />
            </View>
          </>
        ) : (
          <Button title="Continue" onPress={onClose} />
        )}
      </View>
    </SafeAreaView>
  );
};

export default SettlementConfirmation;

const styles = StyleSheet.create({
  container: {
    ...Spacing.defaultContainer,
  },
  modalWrap: {
    alignContent: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    borderRadius: 5,
  },
  header: {
    fontFamily: 'Poppins-Bold',
    letterSpacing: 0.9,
    fontSize: RFValue(13),
    color: colors.darkGreen,
  },
  text: {
    color: colors.darkGreen,
    fontFamily: 'Poppins-Regular',
    fontSize: 12,
    letterSpacing: 0.8,
    paddingHorizontal: 15,
    textAlign: 'center',
  },
  greenNumbers: {
    ...Typography.boldGreen,
    alignSelf: 'flex-start',
    marginRight: 10,
  },
  bodyText: {
    ...Typography.bodyText,
    alignSelf: 'flex-start',
    paddingTop: 2,
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
});
