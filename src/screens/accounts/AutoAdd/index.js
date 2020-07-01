import React, {useContext, useState, useRef} from 'react';
import {SafeAreaView, Text, StyleSheet, View} from 'react-native';
import {Spacing, Typography} from '../../../utilities/styles';
import {Form, TextInput} from '../../../components/Form';
import {Button} from '../../../components/Button';
import {maskPhone} from '../../../utilities/validation';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import Navigation from '../../../navigation';
// import {GlobalContext} from '../../GlobalContext';

const AutoAdd = ({navigation}) => {
  // const [globalData, setGlobalData] = useContext(GlobalContext);
  const [fn, setFn] = useState('');
  const [ln, setLn] = useState('');
  const [ssn, setSsn] = useState('');
  const [date, setDate] = useState('');
  const [address, setAddress] = useState('');

  return (
    <>
      <SafeAreaView style={styles.container}>
        <Text style={styles.blockText}>
          Let’s add some of your details to get started. Don’t worry, this
          information is only used to verify your accounts.
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
            label="Social Security Number"
            keyboardType="numeric"
            onChangeText={text => setSsn(maskPhone(text))}
            value={ssn}
            highlightOnFocus
            // invalid={!phoneValid}
            message={'Please enter your phone number'}
          />
          <TextInput
            datePicker
            setDateValue={setDate}
            label="Date of Birth"
            value={date}
            highlightOnFocus
            // invalid={!phoneValid}
            message={'Please enter your phone number'}
          />
          <TextInput
            label="Address"
            value={address}
            onChangeText={text => setAddress(text)}
            highlightOnFocus
            // invalid={!phoneValid}
            message={'Please enter your phone number'}
          />
        </Form>
        <View style={styles.bottomButtonsContainer}>
          <Button
            title="Continue"
            onPress={() => navigation.navigate('Verification')}
          />
        </View>
      </SafeAreaView>
    </>
  );
};

export default AutoAdd;

const styles = StyleSheet.create({
  container: {
    ...Spacing.defaultContainer,
  },
  blockText: {
    ...Typography.subheaderText,
    textAlign: 'left',
    marginVertical: 30,
    marginHorizontal: 25,
  },
  bottomButtonsContainer: {
    flex: 1,
    paddingHorizontal: 15,
    justifyContent: 'flex-end',
    maxHeight: 90,
  },
});
