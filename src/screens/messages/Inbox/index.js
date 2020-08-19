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

import {colors, Spacing} from '../../../utilities/styles';
import {RFValue} from 'react-native-responsive-fontsize';

const Inbox = ({route, navigation}) => {
  const accountName = route.params.account.originalCreditorName;
  const payments = route.params.account.payments;
  const settlements = route.params.account.settlements;
  const {key, hasNotification} = route.params;
  const [unread, setUnread] = useState(hasNotification);

  console.log('hello??', key, payments, settlements);

  return (
    <>
      <SafeAreaView style={styles.container}>
        <ScreenHeader title={'Messages'} navigation={navigation} />

        <View style={[styles.container, {justifyContent: 'flex-start'}]}>
          <ScrollView>
            <SearchFilter />

            <MessageButton
              unread={key === 0 && unread}
              subject={'Message from Creditor'}
              date={'07.30.2020'}
              onPress={() => {
                navigation.navigate('Details', {
                  accountName,
                  message:
                    'Dear Consumer: \n\nWe want to help your resolve your account for less than the amount due. ',
                });
                setUnread(false);
              }}
            />
            {payments.length > 0 && (
              <MessageButton
                subject={'Message from Creditor'}
                date={'07.24.2020'}
                onPress={() => {
                  navigation.navigate('Details', {
                    accountName,
                    message:
                      'Dear Consumer: \n\nWe have received your scheduled payment. ',
                  });
                }}
              />
            )}
            {settlements.length > 0 && (
              <MessageButton
                subject={'Message from Creditor'}
                date={'07.21.2020'}
                onPress={() => {
                  navigation.navigate('Details', {
                    accountName,
                    message:
                      'Dear Consumer: \n\nWe have received your offer to settle your account for less than the full balance.',
                  });
                }}
              />
            )}
            <MessageButton
              subject={'Statement'}
              date={'06.24.2020'}
              // onPress={() => navigation.navigate('Details', 'Statement')}
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
