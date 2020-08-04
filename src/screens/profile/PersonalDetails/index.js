import React, {useState, useContext} from 'react';
import {
  SafeAreaView,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  View,
  Switch,
} from 'react-native';
import {GlobalContext} from '../../../GlobalContext';
import {Header} from '../../../components/Header';
import {Form, TextInput} from '../../../components/Form';
import {Button} from '../../../components/Button';

import {ScreenHeader} from '../../../components/ScreenHeader';
import {colors, Spacing} from '../../../utilities/styles';
import {RFValue, RFPercentage} from 'react-native-responsive-fontsize';

const Personal = ({navigation}) => {
  const [globalData, setGlobalData] = useContext(GlobalContext);
  const {user, session} = globalData;
  const [fn, setFn] = useState(user.given_name);
  const [ln, setLn] = useState(user.family_name);
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');

  const [fnValid, setFnValid] = useState(true);
  const [lnValid, setLnValid] = useState(true);
  const [emailValid, setEmailValid] = useState(true);
  const [phoneValid, setPhoneValid] = useState(true);
  const [addressValid, setAddressValid] = useState(true);
  return (
    <>
      <SafeAreaView style={styles.container}>
        <ScreenHeader title={'Personal'} navigation={navigation} />
        <View style={{height: RFValue(15)}} />
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
            label="Email Address"
            onChangeText={text => {
              setEmail(text);
              setEmailValid(true);
            }}
            value={email}
            highlightOnFocus
            invalid={!emailValid}
            message={'Please enter your email'}
          />
          <TextInput
            setPhoneValue={value => setPhone(value)}
            onPress={text => {
              setPhone(text);
              setPhoneValid(true);
            }}
            label="Phone Number"
            value={phone}
            highlightOnFocus
            invalid={!phoneValid}
            message={'Please enter your phone number'}
          />
        </Form>

        <View style={Spacing.bottomButtonsContainer}>
          <View style={[styles.row, {marginHorizontal: RFValue(10)}]}>
            <Text style={styles.rowText}>Enable Face ID</Text>
            <Switch />
          </View>
          <Button title="Save Changes" />
        </View>
      </SafeAreaView>
    </>
  );
};

export default Personal;

const styles = StyleSheet.create({
  container: {
    ...Spacing.defaultContainer,
    justifyContent: 'flex-start',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: RFValue(10),
  },
  button: {
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: colors.lightGray,
    borderRadius: 5,
    alignContent: 'center',
    marginVertical: RFValue(5),
    minHeight: RFValue(55),
    padding: RFValue(15),
  },
  rowText: {
    fontFamily: 'Poppins-Regular',
    color: colors.darkGreen,
    fontSize: RFValue(12),
    letterSpacing: 0.8,
    alignSelf: 'center',
    textAlign: 'center',
  },
});
