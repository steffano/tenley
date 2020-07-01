import React, {useContext, useState, useRef} from 'react';
import {SafeAreaView, Text, StyleSheet, View} from 'react-native';
import {Spacing, Typography} from '../../../utilities/styles';
import {Form, TextInput} from '../../../components/Form';
import {Button} from '../../../components/Button';
import {maskPhone} from '../../../utilities/validation';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import Navigation from '../../../navigation';
// import {GlobalContext} from '../../GlobalContext';

const ManualAdd = ({navigation}) => {
  // const [globalData, setGlobalData] = useContext(GlobalContext);
  const [fn, setFn] = useState('');
  const [ln, setLn] = useState('');
  const [amountOwed, setAmountOwed] = useState('');
  const [originalAcctNumber, setOriginalAcctNumber] = useState('');
  const [currentAcctName, setCurrenAcctName] = useState('');
  const [currentAcctNumber, setCurrenAcctNumber] = useState('');

  return (
    <>
      <SafeAreaView style={styles.container}>
        <Text style={styles.blockText}>
          Fill in your creditor or debt collector details and amount owed to add
          the account to your Tenley profile. We’ll only use this info to fill
          in the details of your profile.{' '}
        </Text>
        <Form>
          <TextInput
            label="Legal First Name"
            onChangeText={text => setFn(text)}
            value={fn}
            highlightOnFocus
            // invalid={!fnValid}
            message={'Please enter your first name'}
          />
          <TextInput
            label="Legal Last Name"
            onChangeText={text => setLn(text)}
            value={ln}
            highlightOnFocus
            // invalid={!lnValid}
            message={'Please enter your last name'}
          />
          <TextInput
            label="Current Creditor Account Name"
            onChangeText={text => setCurrenAcctName(text)}
            value={currentAcctName}
            highlightOnFocus
            // invalid={!phoneValid}
            message={'Please enter your phone number'}
          />
          <TextInput
            label="Current Creditor Account Number"
            onChangeText={text => setCurrenAcctNumber(text)}
            value={currentAcctNumber}
            highlightOnFocus
            // invalid={!phoneValid}
            message={'Please enter your phone number'}
          />
          <TextInput
            label="Amount Owed"
            onChangeText={text => setAmountOwed(text)}
            value={amountOwed}
            highlightOnFocus
            // invalid={!phoneValid}
            message={'Please enter your phone number'}
          />
          <TextInput
            label="Original Creditor Account Number"
            onChangeText={text => setOriginalAcctNumber(text)}
            value={originalAcctNumber}
            highlightOnFocus
            // invalid={!phoneValid}
            message={'Please enter your phone number'}
          />
        </Form>
        <View style={styles.bottomButtonsContainer}>
          <Button
            title="Complete Manual Add"
            onPress={() =>
              navigation.reset({
                index: 0,
                routes: [{name: 'Accounts'}],
              })
            }
          />
        </View>
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
  },
});
