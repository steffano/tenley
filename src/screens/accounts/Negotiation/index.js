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
import Bullet from '../../../components/Bullet';
import {RFValue, RFPercentage} from 'react-native-responsive-fontsize';
import currency from 'currency.js';
import moment from 'moment';
import apis from '../../../apis/';

// import {GlobalContext} from '../../GlobalContext';

const Negotiation = ({route, navigation}) => {
  const [globalData, setGlobalData] = useContext(GlobalContext);
  const toUSD = value => currency(value, {symbol: '$', precision: 0}).format();

  const account = route.params.account;

  const totalDebt = currency(account.amountOwed).value;
  const [debtBalance, setDebtBalance] = useState(totalDebt * 0.6);
  const [payment, setPayment] = useState(debtBalance * 0.1);
  const [months, setMonths] = useState(debtBalance / payment);

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

  const {user, session} = globalData;
  const jwt = session.accessToken.jwtToken;

  const getAccounts = async () => {
    console.log('made it');
    const accts = await apis.getAccounts(jwt);
    setGlobalData({
      ...globalData,
      accounts: accts.data.with,
    });
    switchScreen();
  };

  const switchScreen = () => {
    navigation.reset({
      index: 0,
      routes: [{name: 'Accounts', params: 'fromImportLoading'}],
    });
  };

  const handleComplete = async () => {
    try {
      const added = await apis.postSettlement(
        settlementObj,
        jwt,
        account.accountID,
      );
      if (added) {
        getAccounts();
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <>
      <SafeAreaView style={styles.container}>
        <ScrollView>
          <View style={{padding: 15}}>
            <Text style={styles.blockText}>
              To start the settlement process, send an offer to your creditor or
              debt collector for how much you'd like to lower your balance.
            </Text>
            <View style={{height: 20}} />
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

            <Button title="Submit Offer" onPress={() => handleComplete()} />
          </View>
        </ScrollView>
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
