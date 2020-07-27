import React, {useContext, useState} from 'react';
import {
  SafeAreaView,
  Text,
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
} from 'react-native';
import {colors, Spacing} from '../../utilities/styles';
import {Button} from '../../components/Button';
import {ScreenHeader} from '../../components/ScreenHeader';
import {SearchFilter} from '../../components/SearchFilter';
import Modal from 'react-native-modal';
import BankLogin from '../../components/Modals/bank-login';

import {RFValue} from 'react-native-responsive-fontsize';

const BankSetup = ({navigation, route}) => {
  const [showLogin, setShowLogin] = useState(false);

  const {
    paymentType,
    account,
    paymentAmount,
    months,
    paymentDate,
    frequency,
  } = route.params;

  return (
    <>
      <SafeAreaView style={styles.container}>
        <ScreenHeader title={'Schedule Payments'} navigation={navigation} />
        <View
          style={{
            flex: 1,
            paddingHorizontal: 10,
            marginTop: RFValue(20),
          }}>
          <Text style={[styles.text, {fontFamily: 'Poppins-Bold'}]}>
            Select your bank
          </Text>
          <Text style={styles.text}>
            Choose the bank where your scheduled payments will be withdrawn
            from.
          </Text>
          <SearchFilter searchOnly />
        </View>

        {/* <View> */}
        <TouchableOpacity
          onPress={() => setShowLogin(true)}
          style={{
            flex: 3,
            justifyContent: 'flex-start',
            alignItems: 'center',
            paddingHorizontal: 15,
          }}>
          <Image
            source={require('../../assets/bank-tiles.png')}
            resizeMode="stretch"
            style={styles.bankTiles}
          />
        </TouchableOpacity>
        {/* </View> */}
      </SafeAreaView>
      <Modal
        isVisible={showLogin}
        backdropColor="#0079c2"
        backdropOpacity={100}
        onBackdropPress={() => {
          setShowLogin(false);
        }}>
        <BankLogin
          onClose={() => setShowLogin(false)}
          onSuccess={() => {
            setShowLogin(false);
            navigation.navigate('PaymentConfirmation', {
              paymentType,
              account,
              paymentAmount,
              months,
              paymentDate,
              frequency,
            });
          }}
          navigation={navigation}
        />
      </Modal>
    </>
  );
};

export default BankSetup;

const styles = StyleSheet.create({
  container: {
    ...Spacing.defaultContainer,
  },
  bankTiles: {
    height: '100%',
    width: '100%',
  },
  text: {
    fontFamily: 'Poppins-Regular',
    letterSpacing: 0.8,
    fontSize: RFValue(12),
    paddingHorizontal: 15,
    paddingVertical: 5,
  },
});
