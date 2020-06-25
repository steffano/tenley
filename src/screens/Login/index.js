import React, {useContext, useState} from 'react';
import {SafeAreaView, Text, View} from 'react-native';
import {GlobalContext} from '../../GlobalContext';
import {Form, TextInput} from '../../components/Form';
import {Button} from '../../components/Button';
import isEmpty from 'lodash/isEmpty';
// import * as Keychain from 'react-native-keychain';
import {colors} from '../../utilities/styles';

import {Auth} from 'aws-amplify';

const Login = ({navigation}) => {
  const [, setGlobalData] = useContext(GlobalContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailValid, setEmailValid] = useState(true);
  const [pwValid, setPwValid] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');

  const login = async () => {
    setErrorMessage('');
    if (validateForm()) {
      try {
        const user = await Auth.signIn({
          username: email,
          password,
        });
        if (user) {
          storeUser(user);
        }
      } catch (error) {
        if (error.code === 'UserNotConfirmedException') {
          setErrorMessage(error.message);
        }
        if (error.code === 'NotAuthorizedException') {
          setErrorMessage(error.message);
          console.log(error);
        }
      }
    }
  };

  const storeUser = async CognitoUser => {
    // await Keychain.setGenericPassword(
    //   'CognitoUser',
    //   JSON.stringify(CognitoUser),
    // );
    console.log(CognitoUser);
    setGlobalData({loggedIn: true});
  };

  const validateForm = () => {
    setEmailValid(email !== '');
    setPwValid(password !== '');
    return email !== '' && password !== '';
  };

  return (
    <SafeAreaView style={{flex: 1}}>
      <Form header="Log In">
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
          message={'Please enter your email'}
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
          message={'Please enter your password'}
        />
        <Text
          style={{
            paddingHorizontal: 10,
            fontFamily: 'Poppins-Regular',
            color: colors.darkRed,
          }}>
          {errorMessage}
        </Text>
        <Button textOnly title="USE FACE ID" />
      </Form>
      <View
        style={{
          flex: 1,
          width: '90%',
          alignSelf: 'center',
          justifyContent: 'flex-end',
        }}>
        {/* <Button
            title="Log In"
            onPress={() => setGlobalData({loggedIn: true})}
          /> */}
        <Button title="Log In" onPress={() => login()} />
        <Button
          textOnly
          title="DON'T HAVE AN ACCOUNT? SIGN UP HERE"
          onPress={() => navigation.navigate('Register')}
        />
      </View>
    </SafeAreaView>
  );
};

export default Login;
