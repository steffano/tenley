import React, {useContext, useState} from 'react';
import {
  SafeAreaView,
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
} from 'react-native';
import {GlobalContext} from '../../GlobalContext';
import {Form, TextInput} from '../../components/Form';
import {Button} from '../../components/Button';
import {colors, Spacing} from '../../utilities/styles';
import {RFValue, RFPercentage} from 'react-native-responsive-fontsize';
import {maskPhone, unmask} from '../../utilities/validation';
import Modal from 'react-native-modal';

import {
  CodeField,
  Cursor,
  useBlurOnFulfill,
  useClearByFocusCell,
} from 'react-native-confirmation-code-field';

const Verify = ({navigation}) => {
  const [globalData, setGlobalData] = useContext(GlobalContext);
  const user = globalData.user;
  const [showResend, setShowResend] = useState(false);
  const [phone, setPhone] = useState(maskPhone(user.phone_number.slice(2)));

  const handleVerify = () => {
    navigation.navigate('FaceId');
  };

  const handleResend = () => {
    setGlobalData({
      ...globalData,
      user: {...user, phone_number: '+1' + unmask(phone)},
    });
    setShowResend(false);
  };

  const CELL_COUNT = 6;
  const [value, setValue] = useState('');
  const ref = useBlurOnFulfill({value, cellCount: CELL_COUNT});
  const [props, getCellOnLayoutHandler] = useClearByFocusCell({
    value,
    setValue,
  });

  return (
    <SafeAreaView style={styles.container}>
      <Text style={[styles.headerText, {textAlign: 'center'}]}>
        Authentication
      </Text>
      <Form>
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignContent: 'center',
          }}>
          <Text style={styles.headerText}>Enter your code</Text>
          <Text style={styles.subHeaderText}>
            We sent a code to {maskPhone(user.phone_number.slice(2))}. Check
            your messages and enter the 6-digit pin.
          </Text>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              marginTop: 30,
            }}>
            <CodeField
              ref={ref}
              {...props}
              value={value}
              onChangeText={setValue}
              cellCount={CELL_COUNT}
              rootStyle={styles.codeFieldRoot}
              keyboardType="number-pad"
              textContentType="oneTimeCode"
              renderCell={({index, symbol, isFocused}) => (
                <Text
                  key={index}
                  style={[styles.cell, isFocused && styles.focusCell]}
                  onLayout={getCellOnLayoutHandler(index)}>
                  {symbol || (isFocused ? <Cursor /> : null)}
                </Text>
              )}
            />
          </View>
        </View>
      </Form>
      <View style={Spacing.bottomButtonsContainer}>
        <Button
          disabled={value.length < 6}
          title="Verify"
          onPress={() => handleVerify()}
        />
        <Button
          textOnly
          title="RESEND CODE"
          onPress={() => setShowResend(true)}
        />
      </View>
      <Modal
        isVisible={showResend}
        backdropColor={colors.transparentGreen}
        backdropOpacity={100}>
        <View style={styles.modalWrap}>
          <View style={{padding: 10}}>
            <View style={{alignItems: 'flex-end'}}>
              <TouchableOpacity onPress={() => setShowResend(false)}>
                <Image
                  source={require('../../assets/icons/close.png')}
                  resizeMode="contain"
                  style={{
                    height: 15,
                    width: 15,
                    marginRight: 20,
                    marginTop: 20,
                  }}
                />
              </TouchableOpacity>
            </View>
            <Text
              style={[
                styles.headerText,
                {textAlign: 'center', fontSize: 18, marginBottom: 20},
              ]}>
              Resend Verification Code
            </Text>
            <View
              style={{
                justifyContent: 'center',
                alignContent: 'center',
                paddingHorizontal: 12,
              }}>
              <Text style={[styles.subHeaderText]}>
                Please confirm you've entered your correct phone number and
                resend your verification code.
              </Text>
              <View style={{height: RFValue(20)}} />

              <TextInput
                highlightOnFocus
                label="Phone Number"
                keyboardType="numeric"
                onChangeText={text => setPhone(maskPhone(text))}
                value={phone}
              />
              <View style={{height: RFValue(15)}} />
              <Button
                disabled={phone.length < 9}
                title="Resend Code"
                onPress={() => handleResend()}
              />
              <Button
                textOnly
                title="CANCEL"
                onPress={() => setShowResend(false)}
              />
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

export default Verify;

const styles = StyleSheet.create({
  container: {
    ...Spacing.defaultContainer,
  },
  modalWrap: {
    alignContent: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    borderRadius: 5,
  },
  headerText: {
    marginVertical: 15,
    color: colors.darkGreen,
    fontFamily: 'Poppins-Bold',
    fontSize: RFValue(16),
    letterSpacing: 0.5,
  },
  topRow: {
    marginBottom: RFValue(20),
  },
  subHeaderText: {
    fontFamily: 'Poppins-Regular',
    color: colors.darkGreen,
    fontSize: RFValue(12),
    marginBottom: 20,
    letterSpacing: 0.88,
  },

  root: {flex: 1, padding: 20},
  title: {textAlign: 'center', fontSize: 30},
  codeFieldRoot: {marginTop: 10},
  cell: {
    width: RFPercentage(6.5),
    height: 70,
    lineHeight: 70,
    borderWidth: 1,
    borderRadius: 6,
    borderColor: colors.lightGray,
    textAlign: 'center',
    fontSize: RFValue(35),
    fontFamily: 'Poppins-Bold',
    marginTop: 0,
    marginHorizontal: 5,
    color: colors.tenleyGreen,
  },
  bottomButtonsContainer: {
    flex: 1,
    paddingHorizontal: 15,
    justifyContent: 'flex-end',
  },
  focusCell: {
    borderColor: colors.lightGray,
  },
});
