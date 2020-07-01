import React, {useContext, useState} from 'react';
import {SafeAreaView, Text, View, StyleSheet} from 'react-native';
import {GlobalContext} from '../../GlobalContext';
import {Form, TextInput} from '../../components/Form';
import {Button} from '../../components/Button';
import {GreenModal} from '../../components/Modal';
import {colors, Spacing} from '../../utilities/styles';
import {RFValue, RFPercentage} from 'react-native-responsive-fontsize';
import {maskPhone, unmaskPhone} from '../../utilities/validation';

import {
  CodeField,
  Cursor,
  useBlurOnFulfill,
  useClearByFocusCell,
} from 'react-native-confirmation-code-field';

const Verify = ({navigation}) => {
  const [globalData] = useContext(GlobalContext);

  const [showResend, setShowResend] = useState(false);
  const [phone, setPhone] = useState('');

  const handleVerify = () => {
    navigation.navigate('FaceId');
  };

  const handleResend = () => {
    alert('resent');
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
            We sent a code to {globalData.phone}. Check your messages and enter
            the 6-digit pin.
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
      <View style={styles.bottomButtonsContainer}>
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
      <GreenModal
        onClose={() => setShowResend(false)}
        visible={showResend}
        key={1}
        style={{height: RFPercentage(55)}}>
        <Text style={[styles.headerText, {fontSize: 18, marginBottom: 20}]}>
          Resend Verification Code
        </Text>
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignContent: 'center',
            paddingHorizontal: 12,
          }}>
          <Text style={styles.subHeaderText}>
            Please confirm you've entered your correct phone number and resend
            your verification code.
          </Text>
          {/* <View style={{height: RFValue(20)}} /> */}

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
      </GreenModal>
    </SafeAreaView>
  );
};

export default Verify;

const styles = StyleSheet.create({
  container: {
    ...Spacing.defaultContainer,
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
