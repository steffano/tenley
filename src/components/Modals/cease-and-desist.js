import React from 'react';
import {View, SafeAreaView, Text, StyleSheet} from 'react-native';
import {Button} from '../Button';
import {colors, Spacing, Typography} from '../../utilities/styles';
import {RFPercentage, RFValue} from 'react-native-responsive-fontsize';

const CeaseAndDesist = ({onAccept, onDecline}) => {
  return (
    <SafeAreaView style={styles.modalWrap}>
      <View style={{padding: 15, marginTop: 20}}>
        <Text style={[styles.header, {textAlign: 'center', marginBottom: 25}]}>
          Congrats! You’re on your{'\n'}way to debt freedom.
        </Text>
        <Text style={styles.bodyText}>
          We see you have 2 debts that are in negative standing. Tenley can stop
          these creditors from harassing you by:{'\n'}
        </Text>

        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            alignSelf: 'center',
            maxWidth: '90%',
            marginVertical: RFValue(10),
          }}>
          <Text style={styles.greenNumbers}>1.</Text>
          <Text style={styles.bodyText}>
            Sending each Creditor or Debt Collector a Cease & Desist, forcing
            them by law to stop contacting you directly.
          </Text>
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            alignSelf: 'center',
            maxWidth: '90%',
            marginVertical: RFValue(10),
          }}>
          <Text style={styles.greenNumbers}>2.</Text>
          <Text style={styles.bodyText}>
            Setting up Tenley as the only way Creditors and Debt Collectors can
            communicate to you, so no more harassing phone calls or mail. You
            can view communication with your Creditor or Debt Collector in the
            Messages tab.
          </Text>
        </View>
        <View style={{height: RFValue(15)}} />
        <Text style={styles.bodyText}>
          To continue on your journey to being debt free, please agree to the
          Cease & Desist and communication information above.{'\n'}
          <View style={{height: RFValue(20)}} />
          <Text style={Typography.textLink}>See more details</Text>
        </Text>
        <View style={{height: RFValue(15)}} />

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
    alignSelf: 'flex-start',
  },
});
