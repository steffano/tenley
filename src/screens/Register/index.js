import React, {useContext, useState} from 'react';
import {SafeAreaView, Text, View, StyleSheet} from 'react-native';
import {GlobalContext} from '../../GlobalContext';
import {colors, Typography, Spacing} from '../../utilities/styles';
import {
  maskPhone,
  unmask,
  emailRegex,
  phoneRegex,
  passRegex,
} from '../../utilities/validation';
import {Form, TextInput} from '../../components/Form';
import {Button} from '../../components/Button';
import {Auth} from 'aws-amplify';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import Modal from 'react-native-modal';
import Disclosures from '../../components/Modals/disclosures';

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

  const signup = async () => {
    try {
      const user = await Auth.signUp({
        username: email,
        password,
        attributes: {
          given_name: fn,
          family_name: ln,
          phone_number: '+1' + unmask(phone),
        },
      });
      if (user) {
        storeUser();
      }
    } catch (error) {
      console.log('error signing up:', error.code);
      setErrorMessage(error.message);
      setLoading(false);
    }
  };

  const storeUser = async () => {
    const user = await Auth.signIn({username: email, password});
    console.log('#####', user);
    setGlobalData({
      user: user.attributes,
      session: user.signInUserSession,
      accounts: [],
      // loggedIn: true,
    });
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
    setPhoneValid(phoneRegex.test(unmask(phone)));
    setEmailValid(emailRegex.test(email));
    setPwValid(passRegex.test(password));
    setPw2Valid(confirmPassword === password);
    return (
      fn !== '' &&
      ln !== '' &&
      phoneRegex.test(unmask(phone)) &&
      emailRegex.test(email) &&
      confirmPassword === password &&
      passRegex.test(password)
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAwareScrollView
        contentInsetAdjustmentBehavior="automatic"
        contentContainerStyle={{
          flexGrow: 1,
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
            tooltip
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
            eyeball
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
            eyeball
            highlightOnFocus
            invalid={!pw2Valid}
            textContentType="oneTimeCode"
            message="Passwords must match"
          />
          <Text style={Typography.errorText}>{errorMessage}</Text>
        </Form>
        <View style={styles.bottomButtonsContainer}>
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

      <Modal
        isVisible={showModal}
        backdropColor={colors.transparentGreen}
        backdropOpacity={100}
        onBackdropPress={() => setShowModal(false)}>
        <Disclosures
          onAccept={() => handleAgree()}
          onDecline={() => setShowModal(false)}
        />
      </Modal>
    </SafeAreaView>
  );
};

export default Register;

const styles = StyleSheet.create({
  container: {
    ...Spacing.defaultContainer,
  },

  greenNumbers: {
    ...Typography.boldGreen,
    alignSelf: 'flex-start',
    marginRight: 5,
    marginBottom: 5,
  },
  bottomButtonsContainer: {
    flex: 1,
    paddingHorizontal: 15,
    justifyContent: 'flex-end',
  },
  headerText: {
    ...Typography.headerText,
  },
  bodyText: {
    ...Typography.bodyText,
    alignSelf: 'flex-start',
  },
});
