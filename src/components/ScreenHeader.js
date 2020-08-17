import React, {useContext, useState} from 'react';
import {
  SafeAreaView,
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
} from 'react-native';
import {colors} from '../utilities/styles';
import {RFValue} from 'react-native-responsive-fontsize';

export const ScreenHeader = ({navigation, title, onPress}) => {
  return (
    <>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          marginTop: RFValue(5),
        }}>
        <View style={{flex: 1}}>
          <TouchableOpacity
            style={{paddingVertical: RFValue(10)}}
            onPress={onPress ? onPress : () => navigation.goBack()}>
            <Image
              source={require('../assets/icons/back-arrow.png')}
              style={{marginLeft: 20}}
            />
          </TouchableOpacity>
        </View>
        <View style={{flex: 3}}>
          <Text style={styles.headerText}>{title}</Text>
        </View>
        <View style={{flex: 1}} />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  headerText: {
    alignSelf: 'center',
    fontFamily: 'Poppins-Bold',
    fontSize: RFValue(14),
    letterSpacing: 1.25,
    color: colors.darkGreen,
    textAlign: 'center',
  },
});
