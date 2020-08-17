import React, {useContext, useState, useEffect} from 'react';
import {
  SafeAreaView,
  Text,
  ScrollView,
  TouchableOpacity,
  View,
  StyleSheet,
  Button,
  Image,
} from 'react-native';
import {GlobalContext} from '../../../GlobalContext';
import {AccountButton} from '../../../components/AccountButton';
import {Header} from '../../../components/Header';
import {colors, Spacing} from '../../../utilities/styles';
import {SearchFilter} from '../../../components/SearchFilter';
import {RFValue} from 'react-native-responsive-fontsize';
import {useFocusEffect} from '@react-navigation/native';

const Message = ({navigation}) => {
  const [globalData, setGlobalData] = useContext(GlobalContext);
  const [section, setSection] = useState('Messages');
  const [searchQuery, setSearchQuery] = useState('');
  const {accounts, user} = globalData;

  const newMessage = user.newMessage;
  console.log(newMessage);

  const [hasNotification, setHasNotification] = useState(true);

  useFocusEffect(
    React.useCallback(() => {
      return () => setSearchQuery('');
    }, []),
  );

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
              // onPress={() => setSection('Notifications')}
            >
              <Text style={styles.sectionTitle}>Notifications</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={[styles.container, {justifyContent: 'flex-start'}]}>
          <ScrollView>
            {/* <Text
              style={[
                styles.sectionTitle,
                {alignSelf: 'center', marginTop: RFValue(10)},
              ]}>
              Text describing messages
            </Text> */}
            <SearchFilter
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
            />
            {accounts.length === 0 ? (
              <Text style={[styles.sectionTitle, {alignSelf: 'center'}]}>
                There are no messages to display
              </Text>
            ) : (
              <View style={{marginHorizontal: 15}}>
                {accounts.map((account, key) => {
                  return (
                    account && (
                      <AccountButton
                        notification={key === 0 && hasNotification}
                        key={key}
                        accountName={account.originalCreditorName}
                        lastFour={account.originalCreditorAccountNumber.slice(
                          -4,
                        )}
                        onPress={() => {
                          navigation.navigate('Inbox', {
                            account,
                            key,
                            hasNotification,
                          });
                          key === 0 && setHasNotification(false);
                        }}
                      />
                    )
                  );
                })}
              </View>
            )}
            {/* </Text> */}
          </ScrollView>
          <TouchableOpacity
            onPress={() => navigation.navigate('AskTenley')}
            style={styles.helpIconWrapper}>
            <Image
              source={require('../../../assets/icons/help-bubble.png')}
              resizeMode="contain"
              style={styles.helpIcon}
            />
          </TouchableOpacity>
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
  helpIconWrapper: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    right: RFValue(0),
    bottom: RFValue(0),
  },
  helpIcon: {
    width: RFValue(50),
    height: RFValue(50),
    alignSelf: 'flex-end',
    margin: 20,
  },
});
