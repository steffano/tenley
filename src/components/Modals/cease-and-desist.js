import React from 'react';
import {View, SafeAreaView, Text, StyleSheet, ScrollView} from 'react-native';
import {Button} from '../Button';
import {colors, Spacing, Typography} from '../../utilities/styles';
import {RFPercentage, RFValue} from 'react-native-responsive-fontsize';

const CeaseAndDesist = ({onAccept, onDecline, accounts, user}) => {
  console.log(user);
  return (
    <SafeAreaView style={styles.modalWrap}>
      <View style={{padding: 15, marginTop: 20}}>
        <Text
          style={[
            styles.header,
            {textAlign: 'center', marginBottom: RFValue(10)},
          ]}>
          Stop creditor and debt {'\n'}collector harassment!
        </Text>
        {/* <View
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              alignSelf: 'center',
              maxWidth: '90%',
              marginVertical: RFValue(10),
            }}>
            <Text style={styles.greenNumbers}>1.</Text>
            <Text style={styles.bodyText}>
              If you agree below, Tenley will send a cease and desist to your
              creditor, and their debt collectors, on your behalf, as well as an
              authorization for them to communicate with you regarding your
              account through Tenley. Tenley will send each creditor and/or debt
              collector the following correspondence:
            </Text>
          </View> */}

        <View style={{margin: RFValue(5)}}>
          <Text style={styles.bodyText}>
            {accounts.length > 1
              ? `We see you have ${
                  accounts.length
                } debts that are in negative standing. `
              : 'We see you have 1 debt that is in negative standing. '}
            {'\n\n'}
            If you agree below, Tenley will send a cease and desist to your
            creditor, and their debt collectors, on your behalf, as well as an
            authorization for them to communicate with you regarding your
            account through Tenley. Tenley will send each creditor and/or debt
            collector the following correspondence:
          </Text>
        </View>

        <ScrollView style={{maxHeight: 500}}>
          <View
            style={{
              // flexDirection: 'row',
              justifyContent: 'center',
              alignSelf: 'center',
              maxWidth: '90%',
              marginBottom: RFValue(15),
            }}>
            <Text style={styles.greenNumbers} />
            <Text style={[styles.bodyText, {fontSize: RFValue(9)}]}>
              Dear Creditor or Debt Collector: Be advised you, or anyone acting
              on your behalf, or any company who may purchase my account, are
              hereby notified to cease any and all communications regarding
              account 1111 at my address of {user.address}, or any other
              address, or any telephone number you have in your records or may
              acquire for me. Further, cease any and all communication at my
              place of employment. Notwithstanding the foregoing, YOU MAY
              transmit communication to me through Tenley. To obtain information
              on how you may transmit communication to me through Tenley, please
              see MyTenleyCreditorContact.com. Please note, Tenley does not
              accept calls, mail, or service of process for my account.
            </Text>
          </View>
        </ScrollView>
        {/* <View style={{height: RFValue(15)}} /> */}
        {/* <Text style={styles.bodyText}>
          To continue on your journey to being debt free, please agree to the
          Cease & Desist and communication information above.{'\n'}
          <View style={{height: RFValue(20)}} />
          <Text style={Typography.textLink}>See more details</Text>
        </Text> */}
        {/* <View style={{height: RFValue(15)}} /> */}

        <View>
          <Button title="Agree" onPress={onAccept} />
          <Button textOnly title="DECLINE" onPress={onDecline} />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default CeaseAndDesist;

const styles = StyleSheet.create({
  container: {
    ...Spacing.defaultContainer,
  },
  modalWrap: {
    alignContent: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    borderRadius: 5,
    maxHeight: RFPercentage(92),
  },
  header: {
    fontFamily: 'Poppins-Bold',
    letterSpacing: 0.9,
    fontSize: RFValue(16),
    color: colors.darkGreen,
  },
  text: {
    color: colors.darkGreen,
    fontFamily: 'Poppins-Regular',
    fontSize: 12,
    letterSpacing: 0.8,
    paddingHorizontal: 15,
    textAlign: 'center',
  },
  greenNumbers: {
    ...Typography.boldGreen,
    alignSelf: 'flex-start',
    marginRight: 10,
  },
  bodyText: {
    ...Typography.bodyText,
    fontSize: RFValue(11),
    alignSelf: 'flex-start',
  },
});
