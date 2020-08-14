import React, {useContext, useState} from 'react';
import {
  SafeAreaView,
  Text,
  View,
  StyleSheet,
  Image,
  ScrollView,
} from 'react-native';
import {GlobalContext} from '../../../GlobalContext';
import {colors, Spacing, Typography} from '../../../utilities/styles';
import {Button} from '../../../components/Button';
import Calculator from '../../../components/Calculator';
import {ScreenHeader} from '../../../components/ScreenHeader';
import {RFValue, RFPercentage} from 'react-native-responsive-fontsize';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

import currency from 'currency.js';
import moment from 'moment';
import apis from '../../../apis/';

// import {GlobalContext} from '../../GlobalContext';

const Negotiation = ({route, navigation}) => {
  const [globalData, setGlobalData] = useContext(GlobalContext);
  const toUSD = value => currency(value, {symbol: '$', precision: 0}).format();

  const account = route.params.account;

  const totalDebt = currency(account.amountOwed).value;
  const [debtBalance, setDebtBalance] = useState(totalDebt);
  const [months, setMonths] = useState(12);
  const [payment, setPayment] = useState(Math.ceil(totalDebt / months));

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const bucksTotal = debtBalance - 100;

  const savingsPercentage = Math.floor(
    ((totalDebt - bucksTotal) / totalDebt) * 100,
  );

  const settlementObj = {
    offer: toUSD(debtBalance),
    numMonths: months.toString(),
    createDate: moment().format('YYYY-MM-DD'),
    updateDate: moment().format('YYYY-MM-DD'),
  };

  const handleComplete = async () => {
    setIsLoading(true);
    setError('');
    try {
      const added = await apis.postSettlement(settlementObj, account.accountID);
      if (added) {
        getAccounts();
      }
    } catch (err) {
      setIsLoading(false);
      console.log(err.message);
      setError(
        'An error occurred, please check your information and try again',
      );
    }
  };

  const getAccounts = async () => {
    try {
      const accts = await apis.getAccounts();
      setGlobalData({
        ...globalData,
        accounts: accts.data.with,
        settlement: toUSD(debtBalance),
      });
      switchScreen();
    } catch (error) {
      setIsLoading(false);
      console.log(error);
    }
  };

  const switchScreen = () => {
    setIsLoading(false);
    navigation.reset({
      index: 0,
      routes: [{name: 'Accounts'}],
    });
  };

  return (
    <>
      <SafeAreaView style={styles.container}>
        <ScreenHeader
          title={'Settlement Negotiation'}
          navigation={navigation}
        />
        <KeyboardAwareScrollView
          keyboardOpeningTime={Number.MAX_SAFE_INTEGER}
          contentInsetAdjustmentBehavior="automatic">
          <View style={{padding: RFValue(15)}}>
            <Text style={styles.blockText}>
              To start the settlement process, send an offer to your creditor or
              debt collector for how much you'd like to lower your balance.
            </Text>
            <View style={{height: RFValue(20)}} />
            <View style={styles.row}>
              <Text style={[styles.blockText, {fontFamily: 'Poppins-Bold'}]}>
                You have 3 available offers{'  '}
              </Text>
              <Image
                style={{
                  width: RFValue(15),
                  height: RFValue(15),
                }}
                source={require('../../../assets/icons/info/gray.png')}
              />
            </View>
          </View>
          <View style={styles.rowSeparator} />
          <Calculator
            totalDebt={totalDebt}
            debtBalance={debtBalance}
            setDebtBalance={setDebtBalance}
            payment={payment}
            setPayment={setPayment}
            months={months}
            setMonths={setMonths}
          />
          <View style={{padding: 15}}>
            <Text style={styles.blockText}>
              The offer you're sending is{' '}
              <Text style={{fontFamily: 'Poppins-Bold'}}>
                {toUSD(debtBalance)}
              </Text>
              , split into {months} payments of{' '}
              <Text style={{fontFamily: 'Poppins-Bold'}}>{toUSD(payment)}</Text>
              , for a savings of{' '}
              <Text style={{fontFamily: 'Poppins-Bold'}}>
                {savingsPercentage === 0 ? 1 : savingsPercentage}%
              </Text>
              .
            </Text>
          </View>
          <View style={styles.rowSeparator} />
          <View style={{padding: 15}}>
            <Text style={[styles.blockText, {fontSize: 12}]}>
              Once you submit your offer, the creditor will review and either
              reply with a counter offer or accept your offer.
            </Text>
            <View style={{height: 20}} />
            <Text style={Typography.errorText}>{error}</Text>
            <Button
              disabled={isLoading}
              loading={isLoading}
              title="Submit Offer"
              onPress={() => handleComplete()}
            />
          </View>
        </KeyboardAwareScrollView>
      </SafeAreaView>
    </>
  );
};

export default Negotiation;

const styles = StyleSheet.create({
  container: {
    ...Spacing.defaultContainer,
  },
  blockText: {
    ...Typography.subheaderText,
    fontSize: RFValue(12.5),
    textAlign: 'left',
    paddingTop: 3,
  },
  rowText: {
    fontFamily: 'Poppins-Regular',
    fontSize: RFValue(11),
    letterSpacing: 0.5,
  },
  rowSeparator: {
    height: 1,
    backgroundColor: colors.lightGray,
    marginVertical: 5,
  },
  accountTitle: {
    fontFamily: 'Poppins-Regular',
    fontSize: RFValue(13),
    letterSpacing: 1.25,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    alignContent: 'center',
  },
  balanceText: {fontFamily: 'Poppins-Bold', fontSize: RFValue(18)},
});
