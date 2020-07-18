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
import useApi from '../../../useApi';
import sum from 'lodash/sum';
import map from 'lodash/map';
import get from 'lodash/get';
import currency from 'currency.js';
import Modal from 'react-native-modal';
import CeaseAndDesist from '../../../components/Modals/cease-and-desist';
import AddAccountPrompt from '../../../components/Modals/add-account-prompt';
import SelectAccount from '../../../components/Modals/select-account';
import SettlementConfirmation from '../../../components/Modals/settlement-confirmation';
import apis from '../../../apis';

const ActiveUser = ({navigation, route, accounts}) => {
  const [globalData, setGlobalData] = useContext(GlobalContext);
  const {user, session} = globalData;

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
  const [expandBalance, setExpandBalance] = useState(false);

  const [showCeaseDesist, setShowCeaseDesist] = useState(false);

  console.log('params', route);

  const toUSD = value => currency(value, {symbol: '$', precision: 0}).format();

  console.log(user, 'USER');

  const acceptCeaseAndDesist = async () => {
    setShowCeaseDesist(false);
    const u = await Auth.currentAuthenticatedUser();
    try {
      await Auth.updateUserAttributes(u, {
        'custom:cd_optIn': 'true',
      })
        .then(res => {
          console.log('res', res);
        })
        .then(updateUser())
        .catch(err => {
          console.log(err);
        });
    } catch (err) {
      console.log(err);
    }
  };

  const declineCeaseAndDesist = async () => {
    setShowCeaseDesist(false);
    setGlobalData({
      ...globalData,
      user: {...user, declinedCeaseAndDesist: true},
    });
  };

  // const ceaseAndDesist = () => {
  //   if (!cdDecline) {
  //     const checkOptIn = async () => {
  //       const optIn = get(user, 'custom:cd_optIn');
  //       if (!optIn) {
  //         setTimeout(() => {
  //           setShowCeaseDesist(true);
  //         }, 500);
  //       } else {
  //         console.log('already opted in');
  //       }
  //     };
  //     checkOptIn();
  //   } else {
  //     console.log('already declined this session');
  //   }
  // };
  const optIn = get(user, 'custom:cd_optIn');

  const ceaseAndDesist = () => {
    const cdDecline = get(user, 'declinedCeaseAndDesist', false);

    const checkOptIn = async () => {
      if (!optIn && !cdDecline) {
        setTimeout(() => {
          setShowCeaseDesist(true);
        }, 500);
        console.log(cdDecline, 'HOW');
      } else {
        console.log('already opted in');
      }
    };
    checkOptIn();
  };

  const jwt = session.accessToken.jwtToken;

  const updateUser = async () => {
    const u = await Auth.currentAuthenticatedUser();
    const a = await apis.getAccounts(jwt);
    setGlobalData({...globalData, user: u.attributes});
  };

  // useEffect(() => {
  //   navigation.addListener('focus', () => {
  //     ceaseAndDesist();
  //     console.log(showCeaseDesist, 'decline?');
  //   });
  // }, []);

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
              <View style={[styles.whiteWrap, {paddingVertical: 5}]}>
                <TouchableWithoutFeedback
                  style={{paddingVertical: 15}}
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
                    <View
                      style={{
                        paddingHorizontal: 15,
                        paddingVertical: 10,
                        maxWidth: '90%',
                      }}>
                      <Text style={styles.text}>Earn 100 Tenley Bucks</Text>
                      <Text style={[styles.text, {fontSize: 10}]}>
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
            <View
              style={{
                backgroundColor: colors.lightestGray,
                flex: 1,
                minWidth: 200,
                marginHorizontal: 15,
                marginVertical: 10,
                borderRadius: 5,
                padding: 15,
              }}>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                  }}>
                  <Text
                    style={{
                      fontFamily: 'Poppins-Regular',
                      fontSize: RFValue(12),
                      letterSpacing: RFValue(1),
                    }}>
                    Your total balance{' '}
                  </Text>
                  <Image
                    source={require('../../../assets/icons/info/gray.png')}
                    resizeMode="contain"
                    style={{
                      maxWidth: 20,
                      maxHeight: 20,
                    }}
                  />
                </View>
                <View style={{alignContent: 'center'}}>
                  <Text
                    style={{fontFamily: 'Poppins-Bold', fontSize: RFValue(17)}}>
                    {toUSD(combinedDebt)}
                  </Text>
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

          <View style={{height: 25, width: 10}} />

          <View
            style={{
              flex: 1,
              minWidth: 200,
              marginHorizontal: 25,
              borderRadius: 5,
              padding: 10,
            }}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}>
              <View>
                <Text
                  style={{
                    fontFamily: 'Poppins-Regular',
                    fontSize: RFValue(10),
                    letterSpacing: 1.25,
                  }}>
                  ACCOUNTS
                </Text>
              </View>
              <TouchableOpacity onPress={() => setShowAddAccount(true)}>
                <Image
                  source={require('../../../assets/icons/add.png')}
                  resizeMode="contain"
                  style={{maxWidth: 20, maxHeight: 20}}
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
              <Text
                style={{
                  color: colors.mediumGreen,
                  fontFamily: 'Poppins-Medium',
                  letterSpacing: 1.25,
                  textDecorationLine: 'underline',
                  fontSize: RFValue(10),
                  textAlign: 'center',
                }}>
                Don't see all your accounts? Add manually
              </Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity>
            <Image
              source={require('../../../assets/icons/help-bubble.png')}
              resizeMode="contain"
              style={{
                // position: 'absolute',
                width: RFValue(50),
                height: RFValue(50),
                alignSelf: 'flex-end',
                margin: 20,
              }}
            />
          </TouchableOpacity>
        </SafeAreaView>
      </ScrollView>
      <Modal
        onBackdropPress={() => setShowSelectAccount(false)}
        backdropColor={colors.transparentGreen}
        isVisible={showSelectAccount}>
        <SelectAccount onClose={() => setShowSelectAccount(false)} />
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
        }}>
        <SettlementConfirmation
          onClose={() => {
            setShowSettlementConfirmation(false);
          }}
          navigation={navigation}
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
  greenWrap: {
    maxWidth: '100%',
    backgroundColor: colors.lightGreen,
    alignItems: 'center',
    flex: 1,
    padding: 15,
    borderRadius: 5,
    marginHorizontal: 15,
    marginVertical: 15,
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
  whiteWrap: {
    backgroundColor: 'white',
    alignContent: 'center',
    justifyContent: 'center',
    borderRadius: 5,
    width: '100%',
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
    fontSize: 14,
    letterSpacing: 0.8,
    paddingHorizontal: 15,
  },
  header: {
    fontFamily: 'Poppins-Bold',
    letterSpacing: 0.9,
    fontSize: 16,
    color: colors.darkGreen,
  },
  subheader: {
    fontFamily: 'Poppins-Regular',
    fontSize: RFValue(10),
    letterSpacing: 0.5,
    marginVertical: 10,
    alignSelf: 'center',
    color: colors.darkGreen,
    lineHeight: RFValue(15),
  },
  accountButton: {
    width: '90%',
    borderWidth: 1,
    borderColor: colors.lightGray,
    borderRadius: 5,
    marginVertical: 10,
  },
  underlineText: {
    fontFamily: 'Poppins-Bold',
    textDecorationLine: 'underline',
  },
  tinyText: {
    color: colors.darkGreen,
    fontFamily: 'Poppins-Regular',
    fontSize: RFValue(8),
    letterSpacing: 0.8,
    paddingHorizontal: 10,
    paddingTop: 10,
  },
  tenleyImage: {
    width: RFValue(100),
    height: RFValue(100),
    alignSelf: 'flex-end',
  },
  infoBlock: {
    marginTop: 15,
    height: 10,
    width: 10,
    borderRadius: 100,
    backgroundColor: colors.mediumGreen,
  },
  linkText: {
    fontFamily: 'Poppins-Bold',
    textDecorationLine: 'underline',
    color: colors.mediumGreen,
  },
  bucksIcon: {
    width: RFValue(30),
    height: RFValue(30),
    alignSelf: 'center',
    marginLeft: 20,
    // marginTop: 10,
  },
});
