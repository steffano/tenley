import React from 'react';
import {View, SafeAreaView, Text, StyleSheet} from 'react-native';
import {Button} from '../Button';
import {colors, Spacing, Typography} from '../../utilities/styles';

const Disclosures = ({onAccept, onDecline}) => {
  const disclosureTitle =
    'By agreeing to these disclosures you agree to allow Tenley to access your bank account data to help you lower your debt quickly.';

  const disclosureList = [
    {
      key: '1',
      body:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.\n',
    },
    {
      key: '2',
      body:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. \n Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip.\n',
    },
    {
      key: '3',
      body:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.\n',
    },
  ];

  return (
    <SafeAreaView style={styles.modalWrap}>
      <View style={{paddingVertical: 10, paddingHorizontal: 20, marginTop: 20}}>
        <Text style={[styles.header, {textAlign: 'center', marginBottom: 25}]}>
          Important Disclosures
        </Text>
        <Text style={styles.bodyText}>{disclosureTitle}</Text>
        <View style={{height: 20}} />

        {disclosureList.map((item, index) => {
          return (
            <View
              key={item.key}
              style={{
                flexDirection: 'row',
                justifyContent: 'center',
                alignSelf: 'center',
                maxWidth: '90%',
              }}>
              <Text style={styles.greenNumbers}>{item.key}. </Text>
              <Text style={styles.bodyText}>{item.body}</Text>
            </View>
          );
        })}

        <View style={{height: 20}} />
        <Text style={Typography.textLink}>See more details</Text>

        <View style={{height: 20}} />

        <View>
          <Button title="Agree" onPress={onAccept} />
          <Button textOnly title="DECLINE" onPress={onDecline} />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Disclosures;

const styles = StyleSheet.create({
  container: {
    ...Spacing.defaultContainer,
  },
  modalWrap: {
    alignContent: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    borderRadius: 5,
    // height: '95%',
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
