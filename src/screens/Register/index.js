import React, {useContext, useState} from 'react';
import {SafeAreaView, Text, View, StyleSheet, ScrollView} from 'react-native';
import {GlobalContext} from '../../GlobalContext';
import {colors} from '../../utilities/styles';
import {
  maskPhone,
  unmaskPhone,
  emailRegex,
  phoneRegex,
  passRegex,
} from '../../utilities/validation';
import {Form, TextInput} from '../../components/Form';
import {Button} from '../../components/Button';
import {Auth} from 'aws-amplify';
import isEmpty from 'lodash/isEmpty';
// import * as Keychain from 'react-native-keychain';
import {GreenModal} from '../../components/Modal';
import {RFValue} from 'react-native-responsive-fontsize';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

const Register = ({navigation}) => {
  const [, setGlobalData] = useContext(GlobalContext);

  const [fn, setFn] = useState('');
  const [ln, setLn] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [fnValid, setFnValid] = useState(true);
  const [lnValid, setLnValid] = useState(true);
  const [emailValid, setEmailValid] = useState(true);
  const [phoneValid, setPhoneValid] = useState(true);
  const [pwValid, setPwValid] = useState(true);
  const [pw2Valid, setPw2Valid] = useState(true);

  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);

  const [errorMessage, setErrorMessage] = useState('');

  const disclosureTitle =
    'By agreeing to these disclosures you agree to allow Tenley to access your bank account data to help you lower your debt quickly.';

  const disclosureList = [
    {
      key: '1',
      body:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.\n',
    },
    {
      key: '2',
      body:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip.\n',
    },
    {
      key: '3',
      body:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.\n',
    },
  ];
  const signup = async () => {
    try {
      const user = await Auth.signUp({
        fn,
        ln,
        username: email,
        phone: unmaskPhone(phone),
        password,
      });
      if (user) {
        storeUser(user);
      }
    } catch (error) {
      console.log('error signing up:', error.code);
      setErrorMessage(error.code);
      setLoading(false);
    }
  };

  const storeUser = async CognitoUser => {
    // await Keychain.setGenericPassword(
    //   'CognitoUser',
    //   JSON.stringify(CognitoUser),
    // );
    console.log(CognitoUser);
    navigation.navigate('Verify');
  };

  const startSignup = () => {
    if (validateForm()) {
      setShowModal(true);
    }
  };

  const handleAgree = () => {
    setShowModal(false);
    setLoading(true);
    if (validateForm()) {
      signup();
    }
  };

  const validateForm = () => {
    setFnValid(fn !== '');
    setLnValid(ln !== '');
    setPhoneValid(phoneRegex.test(unmaskPhone(phone)));
    setEmailValid(emailRegex.test(email));
    setPwValid(passRegex.test(password));
    setPw2Valid(confirmPassword === password);
    return (
      fn !== '' &&
      ln !== '' &&
      phoneRegex.test(unmaskPhone(phone)) &&
      emailRegex.test(email) &&
      confirmPassword === password &&
      passRegex.test(password)
    );
  };

  return (
    <SafeAreaView style={{flex: 1}}>
      <KeyboardAwareScrollView
        style={{flex: 1}}
        contentContainerStyle={{
          flexGrow: 1,
          // justifyContent: 'space-between',
          // flexDirection: 'column',
        }}>
        <Form header="Create Your Account">
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
            label="Email"
            keyboardType="email-address"
            onChangeText={text => {
              setEmail(text);
              setEmailValid(true);
            }}
            value={email}
            highlightOnFocus
            invalid={!emailValid}
            message={'Please enter a valid email address'}
          />
          <TextInput
            label="Phone Number"
            keyboardType="phone-pad"
            onChangeText={text => {
              setPhone(maskPhone(text));
              setPhoneValid(true);
            }}
            value={phone}
            highlightOnFocus
            invalid={!phoneValid}
            message={'Please enter your phone number'}
          />
          <TextInput
            label="Password"
            onChangeText={text => {
              setPassword(text);
              setPwValid(true);
            }}
            value={password}
            secureTextEntry
            highlightOnFocus
            invalid={!pwValid}
            textContentType="oneTimeCode"
            message={
              'Password must include upper and lower case letters, numbers, and special characters.'
            }
          />
          <TextInput
            label="Confirm Password"
            onChangeText={text => {
              setConfirmPassword(text);
              setPw2Valid(true);
            }}
            value={confirmPassword}
            secureTextEntry
            highlightOnFocus
            invalid={!pw2Valid}
            textContentType="oneTimeCode"
            message="Passwords must match"
          />
          <Text
            style={{
              paddingHorizontal: 10,
              fontFamily: 'Poppins-Regular',
              color: colors.darkRed,
            }}>
            {errorMessage}
          </Text>
        </Form>
        <View
          style={{
            flex: 1,
            width: '90%',
            alignSelf: 'center',
            justifyContent: 'flex-end',
          }}>
          <Button
            disabled={loading}
            title="Create Account"
            onPress={() => startSignup()}
          />
          <Button
            textOnly
            title="ALREADY A USER? LOG IN HERE"
            onPress={() => navigation.navigate('Login')}
          />
        </View>
      </KeyboardAwareScrollView>

      <GreenModal
        onClose={() => setShowModal(false)}
        visible={showModal}
        key={1}
        style={{height: '90%'}}>
        <View
          style={{
            flex: 1,
          }}>
          <Text style={styles.headerText}>Important Disclosures</Text>
          <Text style={styles.bodyText}>{disclosureTitle}</Text>
          <View
            style={{
              marginTop: RFValue(12),
              justifyContent: 'center',
              paddingHorizontal: 5,
            }}>
            {disclosureList.map((item, index) => {
              return (
                <View key={item.key} style={{flexDirection: 'row'}}>
                  <Text
                    style={{
                      color: colors.tenleyGreen,
                      fontFamily: 'Poppins-Bold',
                      fontSize: RFValue(15),
                    }}>
                    {item.key}.{' '}
                  </Text>

                  <Text style={styles.bodyText}>{item.body}</Text>
                </View>
              );
            })}
          </View>
          <Text
            style={{
              marginTop: 5,
              textDecorationLine: 'underline',
              fontFamily: 'Poppins-Medium',
              fontSize: RFValue(12),
              color: colors.darkGreen,
              marginHorizontal: 10,
            }}>
            See more details
          </Text>
          <View
            style={{
              position: 'absolute',
              bottom: 0,
              width: '100%',
              alignSelf: 'center',
              letterSpacing: 1.25,
            }}>
            <Button title="Agree" onPress={() => handleAgree()} />
            <Button
              textOnly
              title="DECLINE"
              onPress={() => setShowModal(false)}
            />
          </View>
        </View>
      </GreenModal>
    </SafeAreaView>
  );
};

export default Register;

const styles = StyleSheet.create({
  headerText: {
    color: colors.darkGreen,
    fontFamily: 'Poppins-Bold',
    fontSize: RFValue(15),
    marginVertical: RFValue(20),
    textAlign: 'center',
    letterSpacing: 0.75,
  },
  bodyText: {
    color: colors.darkGreen,
    fontFamily: 'Poppins-Regular',
    fontSize: RFValue(12.5),
    textAlign: 'left',
    letterSpacing: 0.88,
    marginHorizontal: RFValue(5),
    marginTop: 2,
  },
});
