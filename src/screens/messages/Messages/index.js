import React, {useContext, useState} from 'react';
import {
  SafeAreaView,
  Text,
  ScrollView,
  TouchableOpacity,
  View,
  StyleSheet,
  Button,
} from 'react-native';
import {GlobalContext} from '../../../GlobalContext';
import {AccountButton} from '../../../components/AccountButton';
import {Header} from '../../../components/Header';
import {colors, Spacing} from '../../../utilities/styles';
import {SearchFilter} from '../../../components/SearchFilter';
import {RFValue} from 'react-native-responsive-fontsize';

const Message = ({navigation}) => {
  const [globalData, setGlobalData] = useContext(GlobalContext);

  const [section, setSection] = useState('Messages');

  const [showNotification, setShowNotification] = useState(true);

  const {accounts} = globalData;
  console.log('msg', accounts);

  return (
    <>
      <SafeAreaView style={styles.container}>
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
        <View style={[styles.container, {justifyContent: 'flex-start'}]}>
          <ScrollView>
            <SearchFilter />
            <View style={{marginHorizontal: 15}}>
              {accounts.map((account, key) => {
                return (
                  account && (
                    <AccountButton
                      notification={key === 0}
                      key={key}
                      accountName={account.originalCreditorName}
                      lastFour={account.originalCreditorAccountNumber.slice(-4)}
                      onPress={() =>
                        navigation.navigate('Inbox', {
                          account,
                        })
                      }
                    />
                  )
                );
              })}
            </View>
            {/* </Text> */}
          </ScrollView>
        </View>
      </SafeAreaView>
    </>
  );
};

export default Message;

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
    fontSize: RFValue(14),
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
    fontSize: RFValue(12),
    letterSpacing: 0.88,
    lineHeight: 22,
    textAlign: 'center',
    alignSelf: 'flex-end',
    marginBottom: 5,
  },
});
