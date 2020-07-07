import React, {useContext, useState, useRef} from 'react';
import {GlobalContext} from '../../../GlobalContext';
import {SafeAreaView, Text, StyleSheet, View} from 'react-native';
import {Spacing, Typography} from '../../../utilities/styles';
import {Form, TextInput} from '../../../components/Form';
import {Button} from '../../../components/Button';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

import {addAccount} from '../../../apis/';
// import {GlobalContext} from '../../GlobalContext';

const ManualAdd = ({navigation}) => {
  const [globalData, setGlobalData] = useContext(GlobalContext);

  const [amountOwed, setAmountOwed] = useState('');
  const [acctNum1, setAcctNum1] = useState('');
  const [acctName, setAcctName] = useState('');
  const [acctNum2, setAcctNum2] = useState('');

  const {user, session} = globalData;
  const [fn, setFn] = useState(user.given_name);
  const [ln, setLn] = useState(user.family_name);
  const jwt = session.accessToken.jwtToken;

  const [fnValid, setFnValid] = useState(true);
  const [lnValid, setLnValid] = useState(true);
  const [acctNum2Valid, setAcctNum2Valid] = useState(true);
  const [acctNameValid, setAcctNameValid] = useState(true);
  const [amountValid, setAmountValid] = useState(true);
  const [acctNum1Valid, setAcctNum1Valid] = useState(true);

  const postBody = {
    debtType: 'UNSECURED',
    originalCreditorName: 'CitiBank',
    originalCreditorAccountNumber: '1234',
    amountOwed: '$75,000',
    openDate: '2012-07-02',
    currentCreditorName: 'Shady Acres Financial, LLC',
    currentCreditorAccountNumber: '5678',
  };

  // const postBody = {
  //   debtType: 'UNSECURED',
  //   originalCreditorName: acctName,
  //   originalCreditorAccountNumber: acctNum2,
  //   amountOwed: amountOwed,
  //   openDate: '2012-07-02',
  //   currentCreditorName: 'Shady Acres Financial, LLC',
  //   currentCreditorAccountNumber: acctNum1,
  // };

  const validateForm = () => {
    return (
      fn !== '' &&
      ln !== '' &&
      acctName !== '' &&
      acctNum2 !== '' &&
      amountOwed !== '' &&
      acctNum1 !== ''
    );
  };

  const handleComplete = () => {
    addAccount(postBody, jwt);
    navigation.reset({
      index: 0,
      routes: [{name: 'Accounts'}],
    });
  };

  return (
    <>
      <SafeAreaView style={styles.container}>
        <KeyboardAwareScrollView
          // contentInsetAdjustmentBehavior="automatic"
          contentContainerStyle={{
            flexGrow: 1,
          }}>
          <Text style={styles.blockText}>
            Fill in your creditor or debt collector details and amount owed to
            add the account to your Tenley profile. We’ll only use this info to
            fill in the details of your profile.{' '}
          </Text>
          <Form>
            <TextInput
              label="Legal First Name"
              onChangeText={text => {
                setFn(text);
                setFnValid(true);
              }}
              value={fn}
              highlightOnFocus
              invalid={!fnValid}
              message={'Please enter your first name'}
            />
            <TextInput
              label="Legal Last Name"
              onChangeText={text => {
                setLn(text);
                setLnValid(true);
              }}
              value={ln}
              highlightOnFocus
              invalid={!lnValid}
              message={'Please enter your last name'}
            />
            <TextInput
              label="Current Creditor Account Name"
              onChangeText={text => {
                setAcctName(text);
                setAcctNameValid(true);
              }}
              value={acctName}
              highlightOnFocus
              invalid={!acctNameValid}
              message={'Please enter the Current Creditor Account Name'}
            />
            <TextInput
              label="Current Creditor Account Number"
              onChangeText={text => {
                setAcctNum2(text);
                setAcctNum2Valid(true);
              }}
              value={acctNum2}
              highlightOnFocus
              invalid={!acctNum2Valid}
              message={'Please enter your phone number'}
            />
            <TextInput
              label="Amount Owed"
              onChangeText={text => {
                setAmountOwed(text);
                setAmountValid(true);
              }}
              value={amountOwed}
              highlightOnFocus
              invalid={!amountValid}
              message={'Please enter your phone number'}
            />
            <TextInput
              label="Original Creditor Account Number"
              onChangeText={text => {
                setAcctNum1(text);
                setAcctNum1Valid(true);
              }}
              value={acctNum1}
              highlightOnFocus
              invalid={!acctNum1Valid}
              message={'Please enter your phone number'}
            />
          </Form>
          <View style={styles.bottomButtonsContainer}>
            <Button
              disabled={!validateForm()}
              title="Complete Manual Add"
              onPress={() => handleComplete()}
            />
          </View>
        </KeyboardAwareScrollView>
      </SafeAreaView>
    </>
  );
};

export default ManualAdd;

const styles = StyleSheet.create({
  container: {
    ...Spacing.defaultContainer,
  },
  blockText: {
    ...Typography.subheaderText,
    textAlign: 'left',
    marginVertical: 15,
    marginHorizontal: 25,
  },
  bottomButtonsContainer: {
    flex: 1,
    paddingHorizontal: 15,
    justifyContent: 'flex-end',
    maxHeight: 90,
    marginBottom: 15,
  },
});
