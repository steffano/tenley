import React, {useContext} from 'react';
import {
  SafeAreaView,
  Text,
  View,
  StyleSheet,
  Image,
  ScrollView,
} from 'react-native';
import {colors, Spacing, Typography} from '../../../utilities/styles';
import {Button} from '../../../components/Button';
import Bullet from '../../../components/Bullet';
import {RFValue, RFPercentage} from 'react-native-responsive-fontsize';
import currency from 'currency.js';
import moment from 'moment';

// import {GlobalContext} from '../../GlobalContext';

const AccountDetails = ({route, navigation}) => {
  // const [globalData, setGlobalData] = useContext(GlobalContext);

  const account = route.params.account;

  const settlements = account.settlements;
  const currentSettlement = settlements[0];
  console.log(currentSettlement);

  const toUSD = value => currency(value, {symbol: '$', precision: 2}).format();

  return (
    <>
      <SafeAreaView style={styles.container}>
        <ScrollView>
          <View style={styles.contentBlock}>
            <View style={[styles.row, {marginBottom: 15}]}>
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
              <Text style={styles.rowText}>Account Number</Text>
              <Text style={styles.rowText}>
                {account.originalCreditorAccountNumber}
              </Text>
            </View>
            <View style={styles.rowSeparator} />
            <View style={styles.row}>
              <Text style={styles.rowText}>Date Opened</Text>
              <Text style={styles.rowText}>
                {moment(account.openDate).format('MMMM Do, YYYY')}
              </Text>
            </View>
            <View style={styles.rowSeparator} />
            <View style={styles.row}>
              <Text style={styles.rowText}>Date Closed</Text>
              <Text style={styles.rowText}>
                {' '}
                {account.closeDate &&
                  moment(account.closeDate).format('MMMM Do, YYYY')}
              </Text>
            </View>
            <View style={styles.rowSeparator} />
            <View style={styles.row}>
              <Text style={styles.rowText}>Status</Text>
              <Text style={styles.rowText}>{account.status}</Text>
            </View>
          </View>

          {currentSettlement ? (
            <View>
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
                      SETTLEMENT DETAILS
                    </Text>
                  </View>
                  <Text>...</Text>
                  {/* <TouchableOpacity onPress={() => setShowAddAccount(true)}>
                <Image
                  source={require('../../../assets/icons/add.png')}
                  resizeMode="contain"
                  style={{maxWidth: 20, maxHeight: 20}}
                />
              </TouchableOpacity> */}
                </View>
              </View>
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
                      Your settlement offer
                    </Text>
                  </View>
                  <View style={{alignContent: 'center'}}>
                    <Text
                      style={{
                        fontFamily: 'Poppins-Bold',
                        fontSize: RFValue(17),
                      }}>
                      {toUSD(currentSettlement.offer)}
                    </Text>
                  </View>
                </View>
              </View>
              <View style={[styles.row, {justifyContent: 'center'}]}>
                <Image
                  source={require('../../../assets/icons/clock.png')}
                  resizeMode="contain"
                  style={{maxWidth: 20, maxHeight: 20}}
                />
                <Text style={styles.rowText}>
                  {'  '} Currently pending creditor response
                </Text>
              </View>
            </View>
          ) : (
            <>
              <View style={styles.contentBlock}>
                <Text style={styles.blockText}>
                  Set up a payment plan or make a {'\n'}single payment now to
                  see the most improvement to your credit score.{'  '}
                  <Image
                    style={{
                      width: RFValue(15),
                      height: RFValue(15),
                    }}
                    resizeMode="contain"
                    source={require('../../../assets/icons/info/gray.png')}
                  />
                </Text>

                <Button title="Payment Set Up" />
              </View>
              <View style={styles.contentBlock}>
                <Text style={styles.blockText}>
                  Negotiate a settlement with your {'\n'}creditor or debt
                  collector to lower your account's total debt.{'  '}
                  <Image
                    style={{
                      width: RFValue(15),
                      height: RFValue(15),
                    }}
                    resizeMode="contain"
                    source={require('../../../assets/icons/info/gray.png')}
                  />
                </Text>
                <Button
                  secondary
                  title="Negotiate a Settlement"
                  onPress={() =>
                    navigation.navigate('Settlement Negotiation', {account})
                  }
                />
              </View>
            </>
          )}
        </ScrollView>
      </SafeAreaView>
    </>
  );
};

export default AccountDetails;

const styles = StyleSheet.create({
  container: {
    ...Spacing.defaultContainer,
  },
  blockText: {
    ...Typography.subheaderText,
    fontSize: RFValue(12),
    textAlign: 'left',
    marginBottom: RFValue(10),
    paddingTop: 3,
  },
  rowText: {
    fontFamily: 'Poppins-Regular',
    color: colors.darkGreen,
    fontSize: RFValue(9),
    letterSpacing: 0.75,
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
    fontSize: RFValue(12),
    letterSpacing: 0.88,
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
