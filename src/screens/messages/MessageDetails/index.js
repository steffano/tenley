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
  const [globalData, setGlobalData] = useContext(GlobalContext);
  const {accountName, message} = route.params;
  const {user} = globalData;
  console.log(accountName);
  return (
    <>
      <SafeAreaView style={styles.container}>
        <ScreenHeader title="Message from Creditor" navigation={navigation} />
        <View style={[styles.container, {justifyContent: 'flex-start'}]}>
          <ScrollView style={{padding: 20}}>
            <Text style={styles.text}>{accountName}</Text>
            <Text style={styles.text}>07.24.2020 - 2:50 PM</Text>
            <View style={styles.row}>
              <TouchableOpacity
                style={styles.row}
                onPress={() =>
                  setGlobalData({
                    ...globalData,
                    user: {...user, newMessage: true},
                  })
                }>
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
              <Text style={styles.text}>{message}</Text>
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
