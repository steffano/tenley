import React, {useState} from 'react';
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
import {Button} from '../../../components/Button';
import {ScreenHeader} from '../../../components/ScreenHeader';
import {colors, Spacing} from '../../../utilities/styles';
import {RFValue, RFPercentage} from 'react-native-responsive-fontsize';
import {Form, TextInput} from '../../../components/Form';
import {Auth} from 'aws-amplify';

const ChangePassword = ({navigation}) => {
  const [currentPw, setCurrentPw] = useState('');
  const [currentPwError, setCurrentPwError] = useState(false);
  const [newPw, setNewPw] = useState('');
  const [newPwError, setNewPwError] = useState(false);
  const [confirmPw, setConfirmPw] = useState('');
  const [confirmPwError, setConfirmPwError] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const changePassword = async () => {
    setIsLoading(true);
    setError('');
    if (validatePasswords()) {
      try {
        const user = await Auth.currentAuthenticatedUser();
        await Auth.changePassword(user, currentPw, newPw);
        navigation.goBack();
      } catch (err) {
        console.log(err.code);
        if (err.code === 'NotAuthorizedException') {
          setCurrentPwError(true);
        } else if (err.code === 'InvalidParameterException') {
          setNewPwError(true);
        } else {
          setError(err.message);
        }
      }
    }
    setIsLoading(false);
  };

  const validatePasswords = () => {
    if (newPw !== confirmPw) {
      setConfirmPwError(true);
      return false;
    } else {
      return true;
    }
  };

  return (
    <>
      <SafeAreaView style={styles.container}>
        <ScreenHeader title={'Change Password'} navigation={navigation} />
        <View
          style={{paddingHorizontal: RFValue(15), marginVertical: RFValue(15)}}>
          <TextInput
            label="Current Password"
            onChangeText={text => {
              setCurrentPw(text);
              setCurrentPwError(false);
            }}
            value={currentPw}
            eyeball
            highlightOnFocus
            invalid={currentPwError}
            message={'Please enter your current password'}
          />
        </View>

        <View
          style={{borderBottomColor: colors.lightGray, borderBottomWidth: 1}}
        />
        <View
          style={{paddingHorizontal: RFValue(15), marginVertical: RFValue(15)}}>
          <TextInput
            label="New Password"
            onChangeText={text => {
              setNewPw(text);
              setNewPwError(false);
            }}
            value={newPw}
            eyeball
            highlightOnFocus
            invalid={newPwError}
            message={
              'New password must include upper and lower case letters, numbers, and special characters.'
            }
          />
          <TextInput
            label="Confirm New Password"
            onChangeText={text => {
              setConfirmPw(text);
              setConfirmPwError(false);
            }}
            value={confirmPw}
            eyeball
            highlightOnFocus
            invalid={confirmPwError}
            message={'Passwords must match'}
          />
        </View>

        <Text
          style={[
            styles.rowText,
            {color: colors.darkRed, fontSize: RFValue(10)},
          ]}>
          {error}
        </Text>

        <View style={Spacing.bottomButtonsContainer}>
          <Button
            disabled={confirmPw === '' || newPw === '' || currentPw === ''}
            title="Save Changes"
            onPress={() => changePassword()}
            loading={isLoading}
          />
        </View>
      </SafeAreaView>
    </>
  );
};

export default ChangePassword;

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
