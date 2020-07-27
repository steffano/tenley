import React, {useContext, useState} from 'react';
import {
  SafeAreaView,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  View,
  StyleSheet,
  Button,
} from 'react-native';
import {GlobalContext} from '../../../GlobalContext';
import {MessageButton} from '../../../components/MessageButton';
import {SearchFilter} from '../../../components/SearchFilter';
import {ScreenHeader} from '../../../components/ScreenHeader';

import {Header} from '../../../components/Header';
import {colors, Spacing} from '../../../utilities/styles';
import {RFValue} from 'react-native-responsive-fontsize';

const Inbox = ({route, navigation}) => {
  const accountName = route.params.account.originalCreditorName;
  const [unread, setUnread] = useState(true);

  return (
    <>
      <SafeAreaView style={styles.container}>
        {/* <Header header={'Messages'} /> */}
        <ScreenHeader title={'Messages'} navigation={navigation} />

        <View style={[styles.container, {justifyContent: 'flex-start'}]}>
          <ScrollView>
            <SearchFilter />

            <MessageButton
              unread={unread}
              markRead={() => setUnread(false)}
              subject={'Message from Creditor'}
              date={'02.24.2020'}
              onPress={() => {
                navigation.navigate('Details', 'Message from Creditor');
                setUnread(false);
              }}
            />
            <MessageButton
              subject={'Statement'}
              date={'02.24.2020'}
              onPress={() => navigation.navigate('Details', 'Statement')}
            />
          </ScrollView>
        </View>
      </SafeAreaView>
    </>
  );
};

export default Inbox;

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
});
