import React from 'react';
import {
  View,
  SafeAreaView,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import {Button} from '../Button';
import {colors, Spacing, Typography} from '../../utilities/styles';
import {RFValue} from 'react-native-responsive-fontsize';

const AddAccountPrompt = ({onClose, navigation}) => {
  return (
    <SafeAreaView style={styles.modalWrap}>
      <View style={{alignItems: 'flex-end', marginTop: 20, marginRight: 20}}>
        <TouchableOpacity onPress={onClose}>
          <Image
            source={require('../../assets/icons/close.png')}
            resizeMode="contain"
            style={{
              // position: 'absolute',
              // top: 0,
              // right: 20,
              height: 15,
              width: 15,
            }}
          />
        </TouchableOpacity>
      </View>
      <Text style={styles.header}>Add Account</Text>
      <View
        style={{
          width: '100%',
          paddingHorizontal: 20,
          paddingBottom: 20,
          paddingTop: 10,
        }}>
        <Button
          title="Auto Add"
          onPress={() => {
            onClose();
            navigation.navigate('Auto Add Accounts');
          }}
        />
        <Button
          secondary
          title="Manually Add"
          onPress={() => {
            onClose();
            navigation.navigate('Accounts', {
              screen: 'Manually Add Accounts',
            });
          }}
        />
      </View>
    </SafeAreaView>
  );
};

export default AddAccountPrompt;

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
    fontSize: RFValue(18),
    color: colors.darkGreen,
    textAlign: 'center',
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
});
