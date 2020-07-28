import React, {useContext, useEffect, useState} from 'react';
import {
  View,
  SafeAreaView,
  Text,
  TouchableWithoutFeedback,
  Image,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import Calculator from '../../../components/Calculator';
import {Button} from '../../../components/Button';
import {RFPercentage, RFValue} from 'react-native-responsive-fontsize';
import {colors, Spacing, Typography} from '../../../utilities/styles';
import {Auth} from 'aws-amplify';
import ActiveUser from './ActiveUser';
import Modal from 'react-native-modal';

const NewUser = ({navigation}) => {
  const [showModal, setShowModal] = useState(false);
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.header}>Welcome to Tenley!</Text>
      <Text style={styles.subheader}>
        To get started on your journey to being debt free, add your accounts
        below.
      </Text>
      <View
        style={{
          flex: 1,
          height: 75,
        }}>
        <Image
          source={require('../../../assets/mascot/tenley-mascot2-tilt.png')}
          resizeMode={'contain'}
          style={{width: '80%', height: '90%', alignSelf: 'center'}}
        />
      </View>
      <View style={styles.contentBlock}>
        <Text style={styles.blockText}>
          You can instantly add and verify your accounts by using the Tenley
          automatic add feature.
        </Text>
        <Button
          title="Auto Add My Accounts"
          onPress={() => setShowModal(true)}
        />
      </View>
      <View style={styles.contentBlock}>
        <Text style={styles.blockText}>
          If you prefer, you can manually add an account. You’ll need the
          creditor name, account number, and amount owed.
        </Text>
        <Button
          secondary
          title="Manually Add"
          onPress={() =>
            navigation.navigate('Accounts', {screen: 'Manually Add Accounts'})
          }
        />
      </View>

      <Modal
        onBackdropPress={() => setShowModal(false)}
        isVisible={showModal}
        backdropColor={colors.transparentGreen}
        backdropOpacity={100}>
        <View
          style={{
            backgroundColor: 'white',
            alignContent: 'center',
            padding: 15,
            borderRadius: 5,
          }}>
          <Text style={[styles.header, {fontSize: RFValue(14)}]}>
            Auto Add Details
          </Text>
          <View style={{height: 20}} />
          <Text
            style={[
              styles.blockText,
              {fontSize: RFValue(12), paddingHorizontal: 10},
            ]}>
            To help you on your journey to becoming debt free. Tenley will
            perform a pull of your credit reports. Tenley will only use this
            data to show you your total debt amounts, each accounts’ details,
            and allow you to being payments or negotiations on your accounts.
          </Text>
          <View style={{height: 10}} />
          <Text style={Typography.textLink}>See more details</Text>
          <View style={{height: 20}} />

          <View>
            <Button
              title="Continue"
              onPress={() => {
                setShowModal(false);
                navigation.navigate('Auto Add Accounts');
              }}
            />
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

export default NewUser;

const styles = StyleSheet.create({
  container: {
    ...Spacing.defaultContainer,
  },
  header: {
    ...Typography.screenHeader,
    textAlign: 'center',
    marginTop: RFValue(15),
  },
  subheader: {
    ...Typography.bodyText,
    textAlign: 'center',
    margin: Spacing.base,
  },
  blockText: {
    ...Typography.subheaderText,
    fontSize: RFValue(12),
    textAlign: 'left',
    marginBottom: RFValue(10),
    letterSpacing: 0.8,
  },
  contentBlock: {
    height: RFValue(160),
    borderWidth: 1,
    borderColor: colors.lightGray,
    backgroundColor: 'white',
    marginHorizontal: RFValue(15),
    marginVertical: RFValue(10),
    padding: RFValue(15),
    borderRadius: 5,
    justifyContent: 'center',
  },
  bottomButtonsContainer: {
    flex: 1,
    paddingHorizontal: 15,
    justifyContent: 'flex-end',
    marginBottom: 10,
  },
});
