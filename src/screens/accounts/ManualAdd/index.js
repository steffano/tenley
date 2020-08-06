import React, {useContext, useState, useRef} from 'react';
import {GlobalContext} from '../../../GlobalContext';
import {SafeAreaView, Text, StyleSheet, View, Image} from 'react-native';
import {Spacing, Typography, colors} from '../../../utilities/styles';
import {Form, TextInput} from '../../../components/Form';
import {Button} from '../../../components/Button';
import {ScreenHeader} from '../../../components/ScreenHeader';
import {maskSSn, unmask} from '../../../utilities/validation';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import currency from 'currency.js';
import {RFValue} from 'react-native-responsive-fontsize';
// import {maskCurrency} from '../../../utilities/validation';
import {Auth} from 'aws-amplify';
import get from 'lodash/get';
import apis from '../../../apis/';
// import {GlobalContext} from '../../GlobalContext';

const ManualAdd = ({navigation}) => {
  const [globalData, setGlobalData] = useContext(GlobalContext);
  const {user, session} = globalData;
  const [amountOwed, setAmountOwed] = useState('');
  const [acctName, setAcctName] = useState('');
  const [acctNum, setAcctNum] = useState('');
  const [ssn, setSsn] = useState(
    user['custom:ssn'] ? maskSSn(user['custom:ssn']) : '',
  );
  const [date, setDate] = useState(user.birthdate || '');

  const [fn, setFn] = useState(user.given_name);
  const [ln, setLn] = useState(user.family_name);
  const jwt = session.accessToken.jwtToken;

  const [fnValid, setFnValid] = useState(true);
  const [lnValid, setLnValid] = useState(true);
  const [acctNumValid, setAcctNumValid] = useState(true);
  const [acctNameValid, setAcctNameValid] = useState(true);
  const [amountValid, setAmountValid] = useState(true);
  const [ssnValid, setSsnValid] = useState(true);
  const [dateValid, setDateValid] = useState(true);

  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const toUSD = value => currency(value, {symbol: '$', precision: 2}).format();
  const postBody = {
    debtType: 'UNSECURED',
    originalCreditorName: acctName,
    originalCreditorAccountNumber: acctNum,
    amountOwed: toUSD(amountOwed),
    originalAmountOwed: toUSD(amountOwed),
    openDate: '2017-07-02',
    currentCreditorName: null,
    currentCreditorAccountNumber: null,
  };

  const val = currency('$20920.23');
  console.log(val.value, toUSD(1234.56));
  console.log(user.birthdate);

  const validateForm = () => {
    return (
      fn !== '' &&
      ln !== '' &&
      acctName !== '' &&
      acctNum !== '' &&
      amountOwed !== '' &&
      ssn !== '' &&
      date !== ''
    );
  };

  const handleComplete = async () => {
    const u = await Auth.currentAuthenticatedUser();
    try {
      setIsLoading(true);
      await Auth.updateUserAttributes(u, {
        'custom:ssn': unmask(ssn),
        birthdate: date,
      });
    } catch (err) {
      setIsLoading(false);
      console.log(err);
    }
    try {
      const added = await apis.addAccount(postBody, jwt);
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

  const switchScreen = () => {
    navigation.reset({
      index: 0,
      routes: [{name: 'Accounts', params: 'fromImportLoading'}],
    });
  };

  const getAccounts = async () => {
    const accts = await apis.getAccounts(jwt);
    setGlobalData({
      ...globalData,
      accounts: accts.data.with,
      ceaseAndDesist: false,
    });
    if (accts) {
      switchScreen();
    }
    setIsLoading(false);
  };

  return (
    <>
      <SafeAreaView style={styles.container}>
        <ScreenHeader title={'Manually Add Accounts'} navigation={navigation} />
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

          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Image
              style={{
                width: RFValue(15),
                height: RFValue(15),
                marginLeft: 25,
              }}
              source={require('../../../assets/icons/file-upload.png')}
            />
            <Button
              textOnly
              title="Upload your statement"
              style={{alignSelf: 'flex-start', marginHorizontal: 10}}
            />
          </View>
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
              label="Social Security Number"
              keyboardType="numeric"
              onChangeText={text => {
                setSsn(maskSSn(text));
                setSsnValid(true);
              }}
              value={ssn}
              highlightOnFocus
              invalid={!ssnValid}
              message={'Please enter your social security number'}
            />
            <TextInput
              datePicker
              setDateValue={value => setDate(value)}
              onPress={text => {
                setDate(text);
                setDateValid(true);
              }}
              label="Date of Birth"
              value={date}
              highlightOnFocus
              invalid={!dateValid}
              message={'Please enter your birthdate'}
            />
            <TextInput
              label="Creditor Name"
              onChangeText={text => {
                setAcctName(text);
                setAcctNameValid(true);
              }}
              value={acctName}
              highlightOnFocus
              invalid={!acctNameValid}
              message={'Please enter the Creditor Name'}
            />
            <TextInput
              label="Creditor Account Number"
              onChangeText={text => {
                setAcctNum(text);
                setAcctNumValid(true);
              }}
              value={acctNum}
              highlightOnFocus
              invalid={!acctNumValid}
            />
            <TextInput
              onSubmitEditing={() => setAmountOwed(toUSD(amountOwed))}
              label="Amount Owed"
              onChangeText={value => {
                setAmountOwed(value);
                setAmountValid(true);
              }}
              value={amountOwed}
              highlightOnFocus
              invalid={!amountValid}
            />
          </Form>
          <View style={Spacing.bottomButtonsContainer}>
            <Button
              loading={isLoading}
              disabled={!validateForm() || isLoading}
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
    marginTop: RFValue(15),
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
