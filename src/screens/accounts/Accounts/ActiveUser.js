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
import {GreenModal} from '../../../components/Modal';
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
import AverageGraph from '../../../components/Modals/average-graph';
import SelectAccount from '../../../components/Modals/select-account';

const ActiveUser = ({navigation, accounts}) => {
  // const accounts = [
  //   {
  //     accountID: 40,
  //     userID: '3e688c4e-f2b9-4d0d-996a-628a3abbd419',
  //     debtType: 'UNSECURED',
  //     status: 'OPEN',
  //     currentCreditorName: 'Texas Eagle Financial',
  //     currentCreditorAccountNumber: '5678',
  //     originalCreditorName: "People's Gas",
  //     originalCreditorAccountNumber: '1234',
  //     amountOwed: '$400',
  //     createDate: '2020-07-07T19:55:41.000Z',
  //     updateDate: null,
  //     openDate: '2012-07-02T00:00:00.000Z',
  //     closeDate: null,
  //     settlements: [],
  //     messages: [],
  //   },
  //   {
  //     accountID: 41,
  //     userID: '3e688c4e-f2b9-4d0d-996a-628a3abbd419',
  //     debtType: 'UNSECURED',
  //     status: 'OPEN',
  //     currentCreditorName: 'Shady Acres Financial, LLC',
  //     currentCreditorAccountNumber: '5678',
  //     originalCreditorName: 'CitiBank',
  //     originalCreditorAccountNumber: '1782',
  //     amountOwed: '$75,000',
  //     createDate: '2020-07-07T19:54:22.000Z',
  //     updateDate: null,
  //     openDate: '2012-07-02T00:00:00.000Z',
  //     closeDate: null,
  //     settlements: [
  //       {
  //         settlementID: 12,
  //         accountID: 40,
  //         status: 'OFFERED',
  //         offer: '$5000',
  //         numMonths: 24,
  //         counteroffer: null,
  //         createDate: '2020-06-30T00:00:00.000Z',
  //         updateDate: '2020-07-01T00:00:00.000Z',
  //       },
  //     ],
  //     messages: [],
  //   },
  //   {
  //     accountID: 42,
  //     userID: '3e688c4e-f2b9-4d0d-996a-628a3abbd419',
  //     debtType: 'UNSECURED',
  //     status: 'OPEN',
  //     currentCreditorName: 'Shady Acres Financial, LLC',
  //     currentCreditorAccountNumber: '5678',
  //     originalCreditorName: 'PNC Bank',
  //     originalCreditorAccountNumber: '1782',
  //     amountOwed: '$5,000',
  //     createDate: '2020-07-07T19:54:22.000Z',
  //     updateDate: null,
  //     openDate: '2012-07-02T00:00:00.000Z',
  //     closeDate: null,
  //     settlements: [],
  //     messages: [],
  //     payments: [
  //       {
  //         paymentID: 51,
  //         paymentAmount: '$600',
  //         status: 'PENDING',
  //       },
  //     ],
  //   },
  //   {
  //     accountID: 43,
  //     userID: '3e688c4e-f2b9-4d0d-996a-628a3abbd419',
  //     debtType: 'UNSECURED',
  //     status: 'OPEN',
  //     currentCreditorName: 'Shady Acres Financial, LLC',
  //     currentCreditorAccountNumber: '5678',
  //     originalCreditorName: 'CitiBank',
  //     originalCreditorAccountNumber: '1782',
  //     amountOwed: '$75,000',
  //     createDate: '2020-07-07T19:54:22.000Z',
  //     updateDate: null,
  //     openDate: '2012-07-02T00:00:00.000Z',
  //     closeDate: null,
  //     settlements: [],
  //     messages: [],
  //     payments: [
  //       {
  //         paymentID: 51,
  //         paymentAmount: '$600',
  //         status: 'FAILED',
  //       },
  //     ],
  //   },
  // ];
  const [globalData, setGlobalData] = useContext(GlobalContext);
  const {user, session} = globalData;

  const [showCalculator, setShowCalculator] = useState(false);
  const totalDebt = 10000;
  const [debtBalance, setDebtBalance] = useState(totalDebt);
  const bucksTotal = debtBalance - 100;

  const savingsPercentage = Math.floor(
    ((totalDebt - bucksTotal) / totalDebt) * 100,
  );

  const [showSelectAccount, setShowSelectAccount] = useState(false);
  const [showGraph, setShowGraph] = useState(false);
  const [showAddAccount, setShowAddAccount] = useState(false);

  const [expandBalance, setExpandBalance] = useState(false);

  const [showCeaseDesist, setShowCeaseDesist] = useState(false);

  const toNum = n => {
    return currency(n).value;
  };
  const a = map(accounts, 'amountOwed');
  const n = map(a, toNum);
  const combinedDebt = sum(n);

  console.log(a, n, combinedDebt);

  const toUSD = value => currency(value, {symbol: '$', precision: 2}).format();

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

  const ceaseAndDesist = () => {
    const checkOptIn = async () => {
      const optIn = get(user, 'custom:cd_optIn');
      if (!optIn) {
        setTimeout(() => {
          setShowCeaseDesist(true);
        }, 400);
      } else {
        console.log('already opted in');
      }
    };
    checkOptIn();
  };

  const updateUser = async () => {
    const u = await Auth.currentAuthenticatedUser();
    setGlobalData({...globalData, user: u.attributes});
  };

  useEffect(() => {
    ceaseAndDesist();
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
              <View style={[styles.whiteWrap, {paddingVertical: 5}]}>
                <TouchableWithoutFeedback
                  style={{paddingVertical: 15}}
                  onPress={() => setShowCalculator(true)}>
                  <Text style={styles.subheader}>
                    What if I lowered my total debt to{' '}
                    <Text style={styles.underlineText}>$10,000</Text>?
                  </Text>
                </TouchableWithoutFeedback>
              </View>
            ) : (
              <>
                <View style={styles.whiteWrap}>
                  <Calculator
                    totalDebt={totalDebt}
                    debtBalance={debtBalance}
                    setDebtBalance={setDebtBalance}>
                    <View style={{flexDirection: 'row'}}>
                      <View style={styles.infoBlock} />
                      <TouchableWithoutFeedback
                        onPress={() => setShowGraph(true)}>
                        <Text style={styles.tinyText}>
                          The average Tenley user is able to negotiate their
                          debt down by 15%.{' '}
                          <Text style={styles.linkText}>VIEW GRAPH</Text>
                        </Text>
                      </TouchableWithoutFeedback>
                    </View>
                  </Calculator>

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
                <View>
                  <Text
                    style={{
                      fontFamily: 'Poppins-Regular',
                      fontSize: 15,
                      letterSpacing: 1.25,
                    }}>
                    Your total balance{' '}
                    <Image
                      source={require('../../../assets/icons/info/gray.png')}
                      resizeMode="contain"
                      style={{maxWidth: 20, maxHeight: 20}}
                    />
                  </Text>
                </View>
                <View>
                  <Text style={{fontFamily: 'Poppins-Bold', fontSize: 22}}>
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
                    fontSize: 13,
                    letterSpacing: 1.25,
                  }}>
                  ACCOUNTS
                </Text>
              </View>
              <TouchableOpacity onPress={() => setShowAddAccount(true)}>
                {/* <Text style={{fontFamily: 'Poppins-Bold', fontSize: 22}} /> */}
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
                  // settlements={account.settlements[0]}
                  payments={account.payments}
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
        isVisible={showGraph}
        backdropColor={colors.transparentGreen}
        onBackdropPress={() => setShowGraph(false)}>
        <AverageGraph onClose={() => setShowGraph(false)} />
      </Modal>
      <Modal
        isVisible={showCeaseDesist}
        backdropColor={colors.transparentGreen}
        onBackdropPress={() => setShowCeaseDesist(false)}>
        <CeaseAndDesist
          onDecline={() => setShowCeaseDesist(false)}
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
