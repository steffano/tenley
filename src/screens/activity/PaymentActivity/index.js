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
import {RFPercentage, RFValue} from 'react-native-responsive-fontsize';
import {colors, Spacing, Typography} from '../../../utilities/styles';
import AccountTile from '../../../components/AccountTile';
import {PaymentButton} from '../../../components/PaymentButton';
import {Button} from '../../../components/Button';
import {ScreenHeader} from '../../../components/ScreenHeader';
import {GlobalContext} from '../../../GlobalContext';
import filter from 'lodash/filter';

const PaymentActivity = ({navigation, route}) => {
  const [globalData, setGlobalData] = useContext(GlobalContext);
  const {accounts, session} = globalData;
  const jwt = session.accessToken.jwtToken;

  const account = route.params.account;
  const upcomingPayments = filter(account.payments, ['status', 'SCHEDULED']);
  const pastPayments = filter(account.payments, ['status', 'POSTED']);

  const [section, setSection] = useState(
    upcomingPayments.length === 0 ? 'Past' : 'Upcoming',
  );
  console.log(account, upcomingPayments);

  return (
    <>
      <SafeAreaView style={{flex: 1, backgroundColor: 'white'}}>
        <ScreenHeader
          title={`${account.originalCreditorName} Payments`}
          navigation={navigation}
        />
        <View style={styles.headerBar}>
          <View style={styles.row}>
            <TouchableOpacity
              style={[
                styles.headerToggle,
                {
                  borderBottomColor:
                    section === 'Upcoming' ? colors.tenleyGreen : 'transparent',
                },
              ]}
              onPress={() => setSection('Upcoming')}>
              <Text style={styles.sectionTitle}>Upcoming</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.headerToggle,
                {
                  borderBottomColor:
                    section === 'Past' ? colors.tenleyGreen : 'transparent',
                },
              ]}
              onPress={() => setSection('Past')}>
              <Text style={styles.sectionTitle}>Past Payments</Text>
            </TouchableOpacity>
          </View>
        </View>

        <ScrollView style={{flex: 1}}>
          {section === 'Upcoming' ? (
            <View style={{marginTop: RFValue(15)}}>
              {upcomingPayments.map((payment, index) => {
                return (
                  account && (
                    <PaymentButton
                      key={index}
                      payment={payment}
                      account={account}
                      onPress={() =>
                        navigation.navigate('Payment Details', {
                          account,
                          payment,
                          index,
                        })
                      }
                    />
                  )
                );
              })}
              {upcomingPayments.length === 0 && (
                <Text style={styles.emptyText}>
                  There are no upcoming payments to display.
                </Text>
              )}
            </View>
          ) : (
            <View style={{marginTop: RFValue(15)}}>
              {pastPayments.map((payment, key) => {
                return (
                  account && (
                    <PaymentButton
                      key={key}
                      payment={payment}
                      account={account}
                      onPress={() =>
                        navigation.navigate('Payment Details', {
                          account,
                          payment,
                        })
                      }
                    />
                  )
                );
              })}
              {pastPayments.length === 0 && (
                <Text style={styles.emptyText}>
                  There is no payment history to display.
                </Text>
              )}
            </View>
          )}
        </ScrollView>
        <View
          style={{
            padding: RFValue(15),
            justifyContent: 'flex-end',
            borderTopColor: colors.lightGray,
            borderTopWidth: 1,
          }}>
          <Button title="Make a One Time Payment" />
        </View>
      </SafeAreaView>
    </>
  );
};

export default PaymentActivity;

const styles = StyleSheet.create({
  row: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
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
  emptyText: {
    fontFamily: 'Poppins-Bold',
    letterSpacing: 1.25,
    color: colors.darkGreen,
    alignSelf: 'center',
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
    fontSize: RFValue(16),
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
