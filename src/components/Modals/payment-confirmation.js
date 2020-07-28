import React from 'react';
import {
  View,
  SafeAreaView,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
} from 'react-native';
import {Button} from '../Button';
import Bullet from '../Bullet';
import {colors, Spacing, Typography} from '../../utilities/styles';
import {RFValue, RFPercentage} from 'react-native-responsive-fontsize';
import find from 'lodash/find';
import currency from 'currency.js';

const PaymentConfirmation = ({onClose, paymentType}) => {
  return (
    <SafeAreaView style={styles.modalWrap}>
      <TouchableOpacity onPress={onClose}>
        <View
          style={{
            width: RFValue(100),
            height: RFValue(40),
            alignSelf: 'flex-end',
          }}>
          <Image
            source={require('../../assets/icons/close.png')}
            resizeMode="contain"
            style={{
              position: 'absolute',
              top: RFValue(20),
              right: RFValue(20),
            }}
          />
        </View>
      </TouchableOpacity>
      <View>
        <Image
          source={require('../../assets/badges/tenley-icons-payment.png')}
          resizeMode="contain"
          style={{
            alignSelf: 'center',
            height: RFValue(100),
            width: RFValue(100),
            marginBottom: 10,
          }}
        />
        <View style={{padding: 15}}>
          <Text style={[styles.header, {textAlign: 'center'}]}>
            Payments confirmed!
          </Text>

          <Text style={styles.bodyText}>
            Your payment plan has been set up. {'\n'}We will send you a
            notification {'\n'}reminder before your payment date. {'\n'}You can
            manage your notification {'\n'}preferences in your Profile.
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default PaymentConfirmation;

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
  header: {
    fontFamily: 'Poppins-Bold',
    letterSpacing: 0.9,
    fontSize: RFValue(13),
    color: colors.darkGreen,
  },
  bodyText: {
    ...Typography.bodyText,
    alignSelf: 'center',
    marginVertical: RFValue(10),
    textAlign: 'center',
  },
});
