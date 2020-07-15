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
      <View style={{alignItems: 'flex-end'}}>
        <TouchableOpacity onPress={onClose}>
          <Image
            source={require('../../assets/icons/close.png')}
            resizeMode="contain"
            style={{
              height: 15,
              width: 15,
              marginRight: 20,
              marginTop: 10,
            }}
          />
        </TouchableOpacity>
        <Image
          source={require('../../assets/graph.png')}
          resizeMode="contain"
          style={{
            height: '90%',
            width: '90%',
            padding: 20,
            alignSelf: 'center',
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
    height: '50%',
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
