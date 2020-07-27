import React, {useContext, useState} from 'react';
import {
  SafeAreaView,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  View,
  StyleSheet,
} from 'react-native';
import {GlobalContext} from '../../../GlobalContext';
import {MessageButton} from '../../../components/MessageButton';
import {ScreenHeader} from '../../../components/ScreenHeader';

import {colors, Spacing} from '../../../utilities/styles';
import {RFValue} from 'react-native-responsive-fontsize';

const MessageDetails = ({navigation, route}) => {
  return (
    <>
      <SafeAreaView style={styles.container}>
        <ScreenHeader title={route.params} navigation={navigation} />
        <View style={[styles.container, {justifyContent: 'flex-start'}]}>
          <ScrollView style={{padding: 20}}>
            <Text style={styles.text}>Citibank Creditor Name</Text>
            <Text style={styles.text}>02.24.2020 - 2:50 PM</Text>
            <View style={styles.row}>
              <TouchableOpacity style={styles.row}>
                <Image
                  source={require('../../../assets/icons/mark-unread.png')}
                  style={{
                    marginLeft: 5,
                    marginRight: 5,
                    height: 15,
                    width: 15,
                  }}
                />
                <Text style={[styles.linkText, {color: colors.orange}]}>
                  Mark Unread
                </Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.row}>
                <Image
                  source={require('../../../assets/icons/flag.png')}
                  style={{
                    marginRight: 5,
                    marginLeft: 15,
                    height: 15,
                    width: 15,
                  }}
                />
                <Text style={[styles.linkText, {color: colors.darkRed}]}>
                  Report
                </Text>
              </TouchableOpacity>
            </View>
            <View>
              <View
                style={{
                  borderBottomWidth: 1,
                  marginVertical: 15,
                  borderColor: colors.lightGray,
                }}
              />
              <Text style={styles.text}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor
                in reprehenderit in voluptate velit esse cillum dolore eu fugiat
                nulla pariatur. Excepteur sint occaecat cupidatat non proident,
                sunt in culpa qui officia deserunt mollit anim id est laborum.
                {'\n'}
                {'\n'}
                {'\n'}
                Duis aute irure dolor in reprehenderit in voluptate velit esse
                cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
                cupidatat non proident, sunt in culpa qui officia deserunt
                mollit anim id est laborum.
              </Text>
            </View>
          </ScrollView>
        </View>
      </SafeAreaView>
    </>
  );
};

export default MessageDetails;

const styles = StyleSheet.create({
  container: {
    ...Spacing.defaultContainer,
  },
  headerBar: {
    height: 50,
    flexDirection: 'row',
    borderBottomWidth: 2,
    borderBottomColor: colors.lightGray,
    paddingHorizontal: 20,
    marginTop: 10,
    justifyContent: 'flex-end',
  },
  headerText: {
    width: 71,
    color: colors.darkGreen,
    fontFamily: 'Poppins-Bold',
    fontSize: 16,
    letterSpacing: 0.75,
    lineHeight: 26,
    textAlign: 'center',
    alignSelf: 'flex-end',
    marginBottom: 5,
  },
  headerToggle: {
    marginHorizontal: 5,
    borderBottomWidth: 1,
    borderBottomColor: 'transparent',
    justifyContent: 'flex-end',
  },
  title: {
    color: colors.darkGreen,
    fontFamily: 'Poppins-Bold',
    fontSize: 16,
    letterSpacing: 0.75,
    lineHeight: 26,
    textAlign: 'center',
    alignSelf: 'flex-end',
    marginBottom: 5,
  },
  text: {
    marginHorizontal: 5,
    color: colors.darkGreen,
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    letterSpacing: 0.88,
    lineHeight: 22,
    textAlign: 'left',
    marginVertical: 5,
  },
  linkText: {
    fontFamily: 'Poppins-Regular',
    fontSize: RFValue(10),
    letterSpacing: 1.25,
    textDecorationLine: 'underline',
  },
  messageContainer: {
    backgroundColor: 'white',
    justifyContent: 'center',
    borderRadius: 6,
    borderWidth: 1,
    borderColor: colors.lightGray,
    marginVertical: 5,
    height: RFValue(60),
    marginHorizontal: 15,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 5,
  },
});
