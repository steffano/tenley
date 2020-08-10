import React, {useContext, useEffect, useState} from 'react';
import {
  View,
  SafeAreaView,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import {RFPercentage, RFValue} from 'react-native-responsive-fontsize';
import {colors, Spacing, Typography} from '../../../utilities/styles';
import * as Progress from 'react-native-progress';
import apis from '../../../apis';
import {GlobalContext} from '../../../GlobalContext';

const ImportLoading = ({navigation}) => {
  const switchScreen = () => {
    navigation.reset({
      index: 0,
      routes: [{name: 'Accounts', params: 'fromImportLoading'}],
    });
  };

  const demoAccounts = [
    {
      accountID: 40,
      userID: '3e688c4e-f2b9-4d0d-996a-628a3abbd419',
      debtType: 'UNSECURED',
      status: 'OPEN',
      currentCreditorName: 'Texas Eagle Financial',
      currentCreditorAccountNumber: '1111231115678',
      originalCreditorName: "People's Gas",
      originalCreditorAccountNumber: '1112311159078',
      amountOwed: '$400.53',
      createDate: '2020-07-07T19:55:41.000Z',
      updateDate: null,
      openDate: '2012-07-02T00:00:00.000Z',
      closeDate: null,
      settlements: [],
      messages: [],
    },
    {
      accountID: 41,
      userID: '3e688c4e-f2b9-4d0d-996a-628a3abbd419',
      debtType: 'UNSECURED',
      status: 'OPEN',
      currentCreditorName: 'Shady Acres Financial, LLC',
      currentCreditorAccountNumber: '9090828273735678',
      originalCreditorName: 'CitiBank',
      originalCreditorAccountNumber: '9090828273735678811',
      amountOwed: '$7,000.91',
      createDate: '2020-07-07T19:54:22.000Z',
      updateDate: null,
      openDate: '2012-07-02T00:00:00.000Z',
      closeDate: null,
      settlements: [
        {
          settlementID: 12,
          accountID: 40,
          status: 'OFFERED',
          offer: '$5000',
          numMonths: 24,
          counteroffer: null,
          createDate: '2020-06-30T00:00:00.000Z',
          updateDate: '2020-07-01T00:00:00.000Z',
        },
      ],
      messages: [],
    },
    {
      accountID: 42,
      userID: '3e688c4e-f2b9-4d0d-996a-628a3abbd419',
      debtType: 'UNSECURED',
      status: 'OPEN',
      currentCreditorName: 'Shady Acres Financial, LLC',
      currentCreditorAccountNumber: '8888999911115678',
      originalCreditorName: 'PNC Bank',
      originalCreditorAccountNumber: '8888999911115677768',
      amountOwed: '$5,000.00',
      createDate: '2020-07-07T19:54:22.000Z',
      updateDate: null,
      openDate: '2012-07-02T00:00:00.000Z',
      closeDate: null,
      settlements: [],
      messages: [],
      payments: [
        {
          paymentID: 51,
          paymentAmount: '$600',
          status: 'PENDING',
        },
      ],
    },
    {
      accountID: 43,
      userID: '3e688c4e-f2b9-4d0d-996a-628a3abbd419',
      debtType: 'UNSECURED',
      status: 'OPEN',
      currentCreditorName: 'Shady Acres Financial, LLC',
      currentCreditorAccountNumber: '56789101112134',
      originalCreditorName: 'CitiBank',
      originalCreditorAccountNumber: '56789101112134',
      amountOwed: '$5,000.21',
      createDate: '2020-07-07T19:54:22.000Z',
      updateDate: null,
      openDate: '2012-07-02T00:00:00.000Z',
      closeDate: null,
      settlements: [],
      messages: [],
      payments: [
        {
          paymentID: 51,
          paymentAmount: '$600',
          status: 'FAILED',
        },
      ],
    },
  ];

  const [globalData, setGlobalData] = useContext(GlobalContext);

  useEffect(() => {
    const getAccounts = async () => {
      const accts = await apis.getAccounts().then(
        setTimeout(() => {
          switchScreen();
        }, 5000),
      );
      setGlobalData({
        ...globalData,
        accounts: accts.data.with,
        ceaseAndDesist: false,
      });
      console.log('this', accts.data);
    };
    getAccounts();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <View style={[styles.container]}>
        <View style={styles.speechBubble}>
          <Text style={styles.text}>
            Did you know that the average Tenley user is able to get out of debt
            52% faster by setting up a payment plan?
          </Text>
        </View>
        <View style={styles.container}>
          <Image
            source={require('../../../assets/mascot/tenley-mascot3.png')}
            resizeMode="contain"
            style={{
              width: '80%',
              height: '90%',
              alignSelf: 'center',
              marginLeft: 20,
            }}
          />
        </View>
        <View style={{alignContent: 'center', alignItems: 'center'}}>
          <Text style={[styles.text, {fontSize: RFValue(12)}]}>
            Hang tight! Tenley is importing your {'\n'}details. You’ll see your
            account information here shortly!
          </Text>
          <Progress.Bar
            indeterminate
            indeterminateAnimationDuration={4000}
            progress={200}
            width={200}
            color={colors.tenleyGreen}
            borderColor="transparent"
            unfilledColor={colors.lightGray}
            borderRadius={100}
            marginTop={RFValue(20)}
            marginBottom={RFValue(30)}
          />
          {/* <TouchableOpacity style={styles.helpButton}>
            <Text
              style={[styles.text, {color: 'white', fontSize: RFValue(12)}]}>
              Have any questions? I'm here to help!{' '}
            </Text>
            <Image
              source={require('../../../assets/icons/help-bubble.png')}
              style={{
                width: RFValue(30),
                height: RFValue(50),
                alignSelf: 'center',
              }}
            />
          </TouchableOpacity> */}
        </View>
      </View>
    </SafeAreaView>
  );
};

export default ImportLoading;

const styles = StyleSheet.create({
  container: {
    ...Spacing.defaultContainer,
  },
  text: {
    color: colors.darkGreen,
    fontFamily: 'Poppins-Regular',
    fontSize: RFValue(11),
    letterSpacing: 0.8,
    paddingHorizontal: RFValue(15),
    textAlign: 'center',
  },
  helpButton: {
    backgroundColor: colors.tenleyGreen,
    paddingHorizontal: RFValue(12),
    borderRadius: 100,
    marginVertical: 20,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  speechBubble: {
    width: RFPercentage(40),
    borderColor: colors.lightGray,
    borderWidth: 2,
    borderRadius: 5,
    alignSelf: 'center',
    paddingHorizontal: 15,
    paddingVertical: 15,
    marginTop: RFValue(35),
  },
});
