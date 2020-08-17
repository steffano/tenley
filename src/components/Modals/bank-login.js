import React, {useState} from 'react';
import {
  View,
  SafeAreaView,
  Text,
  StyleSheet,
  Image,
  TextInput,
  Button,
  TouchableOpacity,
} from 'react-native';
import {colors, Spacing, Typography} from '../../utilities/styles';
import {RFValue} from 'react-native-responsive-fontsize';

const BankLogin = ({onClose, onSuccess}) => {
  const [success, showSuccess] = useState(false);
  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={{flexDirection: 'row', alignItems: 'center', marginTop: 10}}>
        <View style={{flex: 1, alignItems: 'flex-start'}}>
          <TouchableOpacity onPress={onClose}>
            <Text style={styles.whiteText}>{'<'}</Text>
          </TouchableOpacity>
        </View>
        <View style={{flex: 3}}>
          <Text style={styles.whiteText}>Enter your Credentials</Text>
        </View>
        <View style={{flex: 1, alignItems: 'flex-end'}}>
          <TouchableOpacity onPress={onClose}>
            <Text style={styles.whiteText}>x</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.modalWrap}>
        <View>
          <Image
            source={require('../../assets/citi-logo-white.png')}
            style={styles.logo}
            resizeMode="contain"
          />
        </View>

        <View style={{height: RFValue(300)}}>
          {success ? (
            <>
              <View style={{height: 40}} />
              <Image
                source={require('../../assets/bank-login-success.png')}
                resizeMode="contain"
                style={{
                  alignSelf: 'center',
                  height: '20%',
                }}
              />
              <Text style={styles.whiteText}>
                {'\n'}
                Your account was {'\n'}successfully linked.
              </Text>
              <View style={{height: RFValue(30)}} />

              <TouchableOpacity onPress={onSuccess}>
                <Text style={styles.button}>Continue</Text>
              </TouchableOpacity>
            </>
          ) : (
            // <View style={styles.modalWrap}>
            <>
              <View style={{marginVertical: 15}}>
                <TextInput
                  title="login"
                  placeholder="User ID"
                  placeholderTextColor="#d1e5f3"
                  style={styles.input}
                />
                <TextInput
                  title="login"
                  placeholder="Password"
                  placeholderTextColor="#d1e5f3"
                  style={styles.input}
                  secureTextEntry
                />
              </View>

              <TouchableOpacity onPress={() => showSuccess(true)}>
                <Text style={styles.button}>Sign On</Text>
              </TouchableOpacity>
            </>
          )}
        </View>
      </View>
    </SafeAreaView>
  );
};

export default BankLogin;

const styles = StyleSheet.create({
  container: {
    ...Spacing.defaultContainer,
    backgroundColor: 'transparent',
    alignItems: 'center',
  },
  modalWrap: {
    alignContent: 'center',
    justifyContent: 'center',
    borderRadius: 5,
    // height: '50%',
    // width: '100%',
    flex: 1,
  },
  header: {
    fontFamily: 'Poppins-Bold',
    letterSpacing: 0.9,
    fontSize: 16,
    color: colors.darkGreen,
  },
  text: {
    color: colors.darkGreen,
    fontFamily: 'Poppins-Regular',
    fontSize: 12,
    letterSpacing: 0.8,
    paddingHorizontal: 15,
    textAlign: 'center',
  },
  greenNumbers: {
    ...Typography.boldGreen,
    alignSelf: 'flex-start',
    marginRight: 10,
  },
  bodyText: {
    ...Typography.bodyText,
    alignSelf: 'flex-start',
    paddingTop: 2,
  },
  logo: {
    // height: '40%',
    // width: '40%',
    // alignSelf: 'center',
    position: 'relative',
    height: RFValue(150),
    width: RFValue(150),
    alignSelf: 'center',
  },
  input: {
    backgroundColor: '#01539680',
    fontFamily: 'VisbyCF-Medium',
    fontSize: 22,
    height: RFValue(50),
    padding: 10,
    margin: 10,
    color: '#d1e5f3',
  },
  button: {
    fontFamily: 'VisbyCF-ExtraBold',
    fontSize: RFValue(20),
    color: 'white',
    textAlign: 'center',
    textDecorationLine: 'underline',
  },
  whiteText: {
    alignSelf: 'center',
    fontFamily: 'VisbyCF-ExtraBold',
    fontSize: RFValue(15),
    letterSpacing: 1.25,
    color: 'white',
    textAlign: 'center',
  },
});
