import React, { useState } from 'react';
import { SafeAreaView, Text, View, StyleSheet } from 'react-native';
import { Form, TextInput } from '../../components/Form';
import { Button } from '../../components/Button';
import { colors, Typography, Spacing } from '../../utilities/styles';
import { useAuth } from '../../contexts/AuthContext';
import { useContext } from 'react';
import { GlobalContext } from '../../GlobalContext';

const Login = ({ navigation }) => {
  const { login, loginWithBiometric, fetchUserProfile } = useAuth();
  const [, setGlobalData] = useContext(GlobalContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailValid, setEmailValid] = useState(true);
  const [pwValid, setPwValid] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');

  const handleLogin = async () => {
    setErrorMessage('');
    if (validateForm()) {
      const result = await login(email, password);
      if (result.success) {
        // Fetch full profile after login
        const profileResult = await fetchUserProfile(result.token);
        
        setGlobalData({
          user: profileResult.success ? profileResult.user : result.user,
          token: result.token,
          accounts: [],
          loggedIn: true,
        });
      } else {
        setErrorMessage(result.error);
      }
    }
  };

  const handleBiometricLogin = async () => {
    const result = await loginWithBiometric();
    if (result.success) {
      setGlobalData({
        user: result.user,
        token: result.token,
        accounts: [],
        loggedIn: true,
      });
    } else {
      setErrorMessage(result.error);
    }
  };

  const validateForm = () => {
    setEmailValid(email !== '');
    setPwValid(password !== '');
    return email !== '' && password !== '';
  };

  return (
    <SafeAreaView style={styles.container}>
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
          eyeball
          highlightOnFocus
          invalid={!pwValid}
          message={'Please enter your password'}
        />
        <Text style={Typography.errorText}>{errorMessage}</Text>
        <Button textOnly title="USE FACE ID" onPress={handleBiometricLogin} />
      </Form>
      <View style={Spacing.bottomButtonsContainer}>
        <Button title="Log In" onPress={handleLogin} />
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

const styles = StyleSheet.create({
  container: {
    ...Spacing.defaultContainer,
  },

  greenNumbers: {
    ...Typography.boldGreen,
    alignSelf: 'flex-start',
    lineHeight: 20,
    marginRight: 5,
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
    lineHeight: 18,
  },
});
