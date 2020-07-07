import React, {useContext, useEffect, useState} from 'react';
import {
  View,
  SafeAreaView,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import Calculator from '../../../components/Calculator';
import {Button} from '../../../components/Button';
import {GreenModal} from '../../../components/Modal';
import {RFPercentage, RFValue} from 'react-native-responsive-fontsize';
import {colors, Spacing, Typography} from '../../../utilities/styles';
import * as Progress from 'react-native-progress';
import {Auth} from 'aws-amplify';

const ImportLoading = ({navigation}) => {
  setTimeout(() => {
    navigation.reset({
      index: 0,
      routes: [{name: 'Accounts'}],
    });
  }, 10000);

  return (
    <SafeAreaView style={styles.container}>
      <View style={[styles.container]}>
        <View
          style={{
            width: RFPercentage(40),
            borderColor: colors.lightGray,
            borderWidth: 2,
            borderRadius: 5,
            alignSelf: 'center',
            paddingHorizontal: 15,
            paddingVertical: 15,
            marginTop: 40,
          }}>
          <Text style={styles.text}>
            Did you know that the average Tenley user is able to get out of debt
            52% faster by setting up a payment plan?
          </Text>
        </View>
        <View style={styles.container}>
          <Image
            source={require('../../../assets/mascot/tenley-mascot3.png')}
            resizeMode="contain"
            style={{
              width: '80%',
              height: '90%',
              alignSelf: 'center',
              marginLeft: 20,
            }}
          />
        </View>
        <View style={{alignContent: 'center', alignItems: 'center'}}>
          <Text style={[styles.text, {fontSize: 14}]}>
            Hang tight! Tenley is importing your {'\n'}accounts. You’ll see them
            here shortly!
          </Text>
          <Progress.Bar
            indeterminate
            indeterminateAnimationDuration={4000}
            progress={200}
            width={200}
            color={colors.tenleyGreen}
            borderColor="transparent"
            unfilledColor={colors.lightGray}
            borderRadius={100}
            marginTop={20}
            marginBottom={30}
          />
          <TouchableOpacity
            style={{
              backgroundColor: colors.tenleyGreen,
              //   paddingVertical: 15,
              paddingHorizontal: 15,
              borderRadius: 100,
              marginVertical: 20,
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text style={[styles.text, {color: 'white', fontSize: 12}]}>
              Have any questions? I'm here to help!{' '}
            </Text>
            <Image
              source={require('../../../assets/icons/help-bubble.png')}
              style={{width: 30, height: 50, alignSelf: 'center'}}
            />
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default ImportLoading;

const styles = StyleSheet.create({
  container: {
    ...Spacing.defaultContainer,
  },
  text: {
    color: colors.darkGreen,
    fontFamily: 'Poppins-Regular',
    fontSize: 12,
    letterSpacing: 0.8,
    paddingHorizontal: 15,
    textAlign: 'center',
  },
});
