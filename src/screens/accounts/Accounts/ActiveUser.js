import React, {useContext, useEffect, useState} from 'react';
import {GlobalContext} from '../../../GlobalContext';

import {
  View,
  SafeAreaView,
  Text,
  TouchableWithoutFeedback,
  Image,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import Calculator from '../../../components/Calculator';
import {Button} from '../../../components/Button';
import {RFPercentage, RFValue} from 'react-native-responsive-fontsize';
import {colors, Spacing, Typography} from '../../../utilities/styles';
import {Auth} from 'aws-amplify';
import AccountTile from '../../../components/AccountTile';
import {useFocusEffect} from '@react-navigation/native';
import useApi from '../../../useApi';
import sum from 'lodash/sum';
import find from 'lodash/find';
import map from 'lodash/map';
import get from 'lodash/get';
import currency from 'currency.js';
import Modal from 'react-native-modal';
import CeaseAndDesist from '../../../components/Modals/cease-and-desist';
import AddAccountPrompt from '../../../components/Modals/add-account-prompt';
import SelectAccount from '../../../components/Modals/select-account';
import SettlementConfirmation from '../../../components/Modals/settlement-confirmation';
import PaymentConfirmation from '../../../components/Modals/payment-confirmation';
import apis from '../../../apis';

const ActiveUser = ({navigation, route, accounts}) => {
  const [globalData, setGlobalData] = useContext(GlobalContext);
  const {user} = globalData;

  const toNum = n => {
    return currency(n).value;
  };
  const a = map(accounts, 'amountOwed');
  const n = map(a, toNum);
  const combinedDebt = sum(n);

  const [showCalculator, setShowCalculator] = useState(false);
  const totalDebt = combinedDebt;
  const [debtBalance, setDebtBalance] = useState(combinedDebt * 0.6);
  const [payment, setPayment] = useState(debtBalance * 0.1);
  const [months, setMonths] = useState(debtBalance / payment);

  const bucksTotal = debtBalance - 100;

  const savingsPercentage = Math.floor(
    ((totalDebt - bucksTotal) / totalDebt) * 100,
  );

  const [showSelectAccount, setShowSelectAccount] = useState(false);
  const [showAddAccount, setShowAddAccount] = useState(false);
  const [showSettlementConfirmation, setShowSettlementConfirmation] = useState(
    false,
  );
  const [showPaymentConfirmation, setShowPaymentConfirmation] = useState(false);
  const [expandBalance, setExpandBalance] = useState(false);

  const [showCeaseDesist, setShowCeaseDesist] = useState(false);

  const nextAccount = find(accounts, function(o) {
    return o.settlements.length === 0;
  });

  console.log('route', route);
  console.log('user', user);
  console.log('accounts', accounts);
  console.log(
    'c&d opt in',
    get(user, 'custom:cd_optIn'),
    'decline',
    get(user, 'acknowledgedCeaseAndDesist', false),
  );
  const toUSD = value => currency(value, {symbol: '$', precision: 0}).format();

  const acceptCeaseAndDesist = async () => {
    setShowCeaseDesist(false);
    setGlobalData({
      ...globalData,
      user: {...user, acknowledgedCeaseAndDesist: true},
    });
    updateUser();
  };

  const declineCeaseAndDesist = async () => {
    setShowCeaseDesist(false);
    setGlobalData({
      ...globalData,
      user: {...user, acknowledgedCeaseAndDesist: true},
    });
  };

  const optIn = get(user, 'custom:cd_optIn');
  const optOut = get(user, 'acknowledgedCeaseAndDesist');

  const acknowledged = optIn || optOut;

  const updateUser = async () => {
    const u = await Auth.currentAuthenticatedUser();
    try {
      await Auth.updateUserAttributes(u, {
        'custom:cd_optIn': 'true',
      });
    } catch (err) {
      console.log(err);
    }
  };

  useFocusEffect(() => {
    if (!acknowledged) {
      setTimeout(() => {
        setShowCeaseDesist(true);
      }, 1000);
    }
    if (globalData.settlement) {
      setTimeout(() => {
        setShowSettlementConfirmation(true);
      }, 1000);
    }
    if (globalData.newPayment) {
      setTimeout(() => {
        setShowPaymentConfirmation(true);
      }, 1000);
    }
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        style={{backgroundColor: 'white'}}
        contentInsetAdjustmentBehavior="automatic"
        contentContainerStyle={{flexGrow: 1}}>
        <SafeAreaView>
          <View style={styles.greenWrap}>
            <View
              style={[
                styles.middleBlock,
                {borderTopColor: 'transparent', paddingVertical: 0},
              ]}>
              <View style={{marginLeft: 15}}>
                <Text style={styles.header}>Tenley's advice!</Text>
                <Text style={styles.subheader}>
                  See how fast you can pay off your{'\n'}debts, or save by
                  negotiating a {'\n'}lower rate with your creditor.
                </Text>
              </View>
              <Image
                source={require('../../../assets/mascot/tenley-mascot4-left.png')}
                resizeMode="contain"
                style={styles.tenleyImage}
              />
            </View>
            {!showCalculator ? (
              <View style={styles.whiteWrap}>
                <TouchableWithoutFeedback
                  style={{paddingVertical: RFValue(15)}}
                  onPress={() => setShowCalculator(true)}>
                  <Text style={styles.subheader}>
                    What if I lowered my total debt to{' '}
                    <Text style={styles.underlineText}>
                      {toUSD(combinedDebt * 0.6)}
                    </Text>
                    ?
                  </Text>
                </TouchableWithoutFeedback>
              </View>
            ) : (
              <>
                <View style={styles.whiteWrap}>
                  <Calculator
                    showTotalDebt
                    totalDebt={totalDebt}
                    debtBalance={debtBalance}
                    setDebtBalance={setDebtBalance}
                    payment={payment}
                    setPayment={setPayment}
                    months={months}
                    setMonths={setMonths}
                  />

                  <View style={styles.middleBlock}>
                    <Image
                      source={require('../../../assets/icons/tenley-bucks.png')}
                      resizeMode="contain"
                      style={styles.bucksIcon}
                    />
                    <View style={styles.bucksBlock}>
                      <Text style={[styles.text, {fontSize: RFValue(14)}]}>
                        Earn 100 Tenley Bucks
                      </Text>
                      <Text style={[styles.text, {fontSize: RFValue(10)}]}>
                        Tenley Bucks you earn can be used to boost your payments
                        towards your debt!
                      </Text>
                    </View>
                  </View>
                  <View style={styles.bottomBlock}>
                    <Text style={styles.text}>
                      The final total amount you would pay is{' '}
                      <Text style={{fontFamily: 'Poppins-Bold'}}>
                        $
                        {bucksTotal.toLocaleString(navigator.language, {
                          maximumFractionDigits: 0,
                        })}
                      </Text>
                      , for a savings of{' '}
                      <Text style={{fontFamily: 'Poppins-Bold'}}>
                        {savingsPercentage === 0 ? 1 : savingsPercentage}%
                      </Text>
                      .
                    </Text>
                  </View>
                </View>
                <View style={{width: '100%', marginTop: 20}}>
                  <Button
                    secondary
                    title="Get Started"
                    onPress={() => setShowSelectAccount(true)}
                  />
                  <Button
                    textOnly
                    title="Close"
                    onPress={() => setShowCalculator(false)}
                  />
                </View>
              </>
            )}
          </View>
          <TouchableOpacity onPress={() => setExpandBalance(!expandBalance)}>
            <View style={styles.grayInfoBlock}>
              <View style={styles.row}>
                <View style={styles.row}>
                  <Text style={styles.text}>Your total balance </Text>
                  <Image
                    source={require('../../../assets/icons/info/gray.png')}
                    resizeMode="contain"
                    style={styles.icon}
                  />
                </View>
                <View style={{alignContent: 'center'}}>
                  <Text style={styles.balanceText}>{toUSD(combinedDebt)}</Text>
                </View>
              </View>

              {expandBalance && (
                <View>
                  <Text style={styles.subheader}>
                    This is your current combined total balance, which will be
                    updated as you make payments or negotiate a settlement.
                  </Text>
                </View>
              )}
            </View>
          </TouchableOpacity>

          <View style={{height: RFValue(10)}} />

          <View style={{alignItems: 'center'}}>
            <View style={[styles.row, {width: RFPercentage(45)}]}>
              <View>
                <Text style={styles.tinyText}>ACCOUNTS</Text>
              </View>
              <TouchableOpacity onPress={() => setShowAddAccount(true)}>
                <Image
                  source={require('../../../assets/icons/add.png')}
                  resizeMode="contain"
                  style={styles.icon}
                />
              </TouchableOpacity>
            </View>
          </View>

          {accounts.map((account, key) => {
            return (
              account && (
                <AccountTile
                  key={key}
                  account={account}
                  navigation={navigation}
                />
              )
            );
          })}
          <View style={{marginVertical: 15, justifyContent: 'flex-end'}}>
            <TouchableOpacity
              onPress={() => navigation.navigate('Manually Add Accounts')}>
              <Text style={styles.greenLink}>
                Don't see all your accounts? Add manually
              </Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity
            onPress={() =>
              navigation.navigate('Profile', {screen: 'Ask Tenley'})
            }>
            <Image
              source={require('../../../assets/icons/help-bubble.png')}
              resizeMode="contain"
              style={styles.helpIcon}
            />
          </TouchableOpacity>
        </SafeAreaView>
      </ScrollView>
      <Modal
        onBackdropPress={() => setShowSelectAccount(false)}
        backdropColor={colors.transparentGreen}
        isVisible={showSelectAccount}>
        <SelectAccount
          onClose={() => setShowSelectAccount(false)}
          accounts={accounts}
          navigation={navigation}
        />
      </Modal>
      <Modal
        isVisible={showCeaseDesist}
        backdropColor={colors.transparentGreen}
        onBackdropPress={() => declineCeaseAndDesist()}>
        <CeaseAndDesist
          onDecline={() => declineCeaseAndDesist()}
          onAccept={() => acceptCeaseAndDesist()}
        />
      </Modal>
      <Modal
        isVisible={showAddAccount}
        backdropColor={colors.transparentGreen}
        onBackdropPress={() => setShowAddAccount(false)}>
        <AddAccountPrompt
          onClose={() => setShowAddAccount(false)}
          navigation={navigation}
        />
      </Modal>
      <Modal
        isVisible={showSettlementConfirmation}
        backdropColor={colors.transparentGreen}
        onBackdropPress={() => {
          setShowSettlementConfirmation(false);
          setGlobalData({
            ...globalData,
            settlement: null,
          });
        }}>
        <SettlementConfirmation
          settlement={globalData.settlement}
          nextAccount={nextAccount}
          accounts={accounts}
          navigation={navigation}
          onAccept={() => {
            setShowSettlementConfirmation(false);
            navigation.navigate('Account Details', {
              account: nextAccount,
            });
            setGlobalData({
              ...globalData,
              settlement: null,
            });
          }}
          onClose={() => {
            setShowSettlementConfirmation(false);
            setGlobalData({
              ...globalData,
              settlement: null,
            });
          }}
        />
      </Modal>
      <Modal
        isVisible={showPaymentConfirmation}
        backdropColor={colors.transparentGreen}
        onBackdropPress={() => {
          setShowPaymentConfirmation(false);
          setGlobalData({
            ...globalData,
            newPayment: false,
          });
        }}>
        <PaymentConfirmation
          navigation={navigation}
          onClose={() => {
            setShowPaymentConfirmation(false);
            setGlobalData({
              ...globalData,
              newPayment: false,
            });
          }}
        />
      </Modal>
    </SafeAreaView>
  );
};

export default ActiveUser;

const styles = StyleSheet.create({
  container: {
    ...Spacing.defaultContainer,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  icon: {
    maxWidth: RFValue(20),
    maxHeight: RFValue(20),
  },
  balanceText: {fontFamily: 'Poppins-Bold', fontSize: RFValue(17)},
  greenWrap: {
    maxWidth: '100%',
    backgroundColor: colors.lightGreen,
    alignItems: 'center',
    flex: 1,
    padding: RFValue(15),
    borderRadius: 5,
    margin: RFValue(15),
  },
  whiteWrap: {
    backgroundColor: 'white',
    alignContent: 'center',
    justifyContent: 'center',
    borderRadius: 5,
    width: '100%',
    paddingVertical: RFValue(5),
  },
  middleBlock: {
    borderBottomWidth: 1,
    borderTopWidth: 1,
    borderBottomColor: colors.lightGray,
    borderTopColor: colors.lightGray,
    paddingVertical: 10,
    flexDirection: 'row',
  },
  bottomBlock: {
    borderRadius: 5,
    paddingVertical: 15,
    alignItems: 'center',
  },
  text: {
    color: colors.darkGreen,
    fontFamily: 'Poppins-Regular',
    fontSize: RFValue(12),
    letterSpacing: 0.8,
  },
  header: {
    fontFamily: 'Poppins-Bold',
    letterSpacing: 0.9,
    fontSize: RFValue(14),
    color: colors.darkGreen,
  },
  subheader: {
    fontFamily: 'Poppins-Regular',
    fontSize: RFValue(10),
    letterSpacing: 0.5,
    marginVertical: RFValue(7),
    alignSelf: 'center',
    color: colors.darkGreen,
    lineHeight: RFValue(15),
  },
  underlineText: {
    fontFamily: 'Poppins-Bold',
    textDecorationLine: 'underline',
  },
  tinyText: {
    fontFamily: 'Poppins-Regular',
    fontSize: RFValue(10),
    letterSpacing: 1.25,
    textAlign: 'left',
    color: colors.darkGreen,
    marginVertical: RFValue(10),
  },
  tenleyImage: {
    width: RFValue(100),
    height: RFValue(100),
    alignSelf: 'flex-end',
  },
  grayInfoBlock: {
    backgroundColor: colors.lightestGray,
    flex: 1,
    minWidth: RFValue(200),
    marginHorizontal: RFValue(15),
    marginVertical: RFValue(10),
    borderRadius: RFValue(5),
    padding: RFValue(15),
  },
  bucksIcon: {
    width: RFValue(30),
    height: RFValue(30),
    alignSelf: 'center',
    marginLeft: 20,
  },
  bucksBlock: {
    paddingHorizontal: RFValue(15),
    paddingVertical: RFValue(10),
    maxWidth: '90%',
  },
  greenLink: {
    color: colors.mediumGreen,
    fontFamily: 'Poppins-Medium',
    letterSpacing: 1.25,
    textDecorationLine: 'underline',
    fontSize: RFValue(10),
    textAlign: 'center',
  },
  helpIcon: {
    // position: 'absolute',
    width: RFValue(50),
    height: RFValue(50),
    alignSelf: 'flex-end',
    margin: 20,
  },
});
