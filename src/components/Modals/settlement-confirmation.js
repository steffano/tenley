import React from 'react';
import {View, SafeAreaView, Text, StyleSheet} from 'react-native';
import {Button} from '../Button';
import {colors, Spacing, Typography} from '../../utilities/styles';

const SettlementConfirmation = ({onAccept, onDecline}) => {
  return (
    <SafeAreaView style={styles.modalWrap}>
      <View style={{padding: 15, marginTop: 20}}>
        <Text style={[styles.header, {textAlign: 'center'}]}>
          Your offer has been sent!
        </Text>
        <View style={{height: 20}} />

        <Text style={styles.bodyText}>
          You've just submitted your first offer of [offer]. We'll let you know
          if your offer is accepted or is countered.
        </Text>
        <View style={{height: 20}} />

        <Text style={styles.header}>You have 2 remaining counters</Text>
        <View style={{height: 20}} />
        <Text style={styles.bodyText}>
          It looks like there is another account you haven't looked at yet.
          Would you like to view the payment options for your [creditor]
          account?
        </Text>
        <View style={{height: 30}} />

        <View>
          <Button title="View Account" onPress={onAccept} />
          <Button textOnly title="NOT RIGHT NOW" onPress={onDecline} />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default SettlementConfirmation;

const styles = StyleSheet.create({
  container: {
    ...Spacing.defaultContainer,
  },
  modalWrap: {
    alignContent: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    borderRadius: 5,
  },
  header: {
    fontFamily: 'Poppins-Bold',
    letterSpacing: 0.9,
    fontSize: 16,
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
    alignSelf: 'flex-start',
    paddingTop: 2,
  },
});
