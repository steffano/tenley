import React, {useContext} from 'react';
import {SafeAreaView, Text, View, StyleSheet, Image} from 'react-native';
import {colors, Spacing, Typography} from '../../../utilities/styles';
import {Button} from '../../../components/Button';
import Bullet from '../../../components/Bullet';
import {RFValue} from 'react-native-responsive-fontsize';

// import {GlobalContext} from '../../GlobalContext';

const AccountDetails = () => {
  // const [globalData, setGlobalData] = useContext(GlobalContext);

  return (
    <>
      <SafeAreaView style={styles.container}>
        <View style={styles.contentBlock}>
          <View style={styles.row}>
            <View style={styles.row}>
              <Text style={styles.accountTitle}>
                {/* {account.originalCreditorName} */}
                Account
              </Text>
              <Bullet color="black" small />
              <Text style={styles.accountTitle}>
                {/* {account.originalCreditorAccountNumber.slice(-4)} */}
                0000
              </Text>
            </View>
            <View>
              <Text style={styles.balanceText}>
                {/* {toUSD(account.amountOwed)} */}
                $9,999.00
              </Text>
            </View>
          </View>
          <Text style={styles.rowText}>{'\n'}Account Number</Text>
          <View style={styles.rowSeparator} />
          <Text style={styles.rowText}>Date Opened</Text>
          <View style={styles.rowSeparator} />
          <Text style={styles.rowText}>Date Closed</Text>
          <View style={styles.rowSeparator} />
          <Text style={styles.rowText}>Status</Text>
        </View>

        <View style={styles.contentBlock}>
          <Text style={styles.blockText}>
            Set up a payment plan or make a single payment now to see the most
            improvement to your credit score.{' '}
            <Image
              style={{height: 20, width: 15}}
              resizeMode="contain"
              source={require('../../../assets/icons/info/gray.png')}
            />
          </Text>

          <Button title="Payment Set Up" />
        </View>

        <View style={styles.contentBlock}>
          <Text style={styles.blockText}>
            Negotiate a settlement with your creditor or debt collector to lower
            your account's total debt.{' '}
            <Image
              style={{height: 20, width: 15}}
              resizeMode="contain"
              source={require('../../../assets/icons/info/gray.png')}
            />
          </Text>
          <Button secondary title="Negotiate a Settlement" />
        </View>
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
    fontSize: RFValue(13),
    textAlign: 'left',
    marginBottom: RFValue(10),
  },
  rowText: {
    fontFamily: 'Poppins-Regular',
    fontSize: 13,
    letterSpacing: 0.5,
  },
  rowSeparator: {
    borderBottomWidth: 1,
    borderBottomColor: colors.lightGray,
    marginVertical: 10,
  },
  contentBlock: {
    minHeight: RFValue(150),
    borderWidth: 1,
    borderColor: colors.lightGray,
    backgroundColor: 'white',
    marginHorizontal: 15,
    marginVertical: 10,
    paddingVertical: 20,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  accountTitle: {
    fontFamily: 'Poppins-Regular',
    fontSize: 15,
    letterSpacing: 1.25,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignContent: 'center',
    alignItems: 'center',
  },
  balanceText: {fontFamily: 'Poppins-Bold', fontSize: 22},
});
