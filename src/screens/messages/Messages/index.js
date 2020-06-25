import React, {useContext, useState} from 'react';
import {
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
  StyleSheet,
} from 'react-native';
import {GlobalContext} from '../../../GlobalContext';
import * as Keychain from 'react-native-keychain';
import {Header} from '../../../components/Header';
import {colors} from '../../../utilities/styles';

const Message = () => {
  const [globalData, setGlobalData] = useContext(GlobalContext);

  Keychain.getGenericPassword().then(res => {
    console.log('#######', res);
  });

  const [section, setSection] = useState('Messages');

  return (
    <>
      <SafeAreaView style={{flex: 1}}>
        {/* <Header header={'Messages'} /> */}
        <View style={styles.headerBar}>
          <View
            style={{
              flex: 1,
              flexDirection: 'row',
              justifyContent: 'flex-end',
            }}>
            <TouchableOpacity
              style={[
                styles.headerToggle,
                {
                  borderBottomColor:
                    section === 'Messages' ? colors.tenleyGreen : 'transparent',
                },
              ]}
              onPress={() => setSection('Messages')}>
              <Text style={styles.sectionTitle}>Messages</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.headerToggle,
                {
                  borderBottomColor:
                    section === 'Notifications'
                      ? colors.tenleyGreen
                      : 'transparent',
                },
              ]}
              onPress={() => setSection('Notifications')}>
              <Text style={styles.sectionTitle}>Notifications</Text>
            </TouchableOpacity>
          </View>
        </View>
        <Text style={{fontFamily: 'VisbyCF-Medium'}}>Message</Text>
      </SafeAreaView>
    </>
  );
};

export default Message;

const styles = StyleSheet.create({
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
  sectionTitle: {
    marginHorizontal: 5,
    color: colors.darkGreen,
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    letterSpacing: 0.88,
    lineHeight: 22,
    textAlign: 'center',
    alignSelf: 'flex-end',
    marginBottom: 5,
  },
});
