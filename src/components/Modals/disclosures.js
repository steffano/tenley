import React from 'react';
import {View, SafeAreaView, Text, StyleSheet, ScrollView} from 'react-native';
import {Button} from '../Button';
import {colors, Spacing, Typography} from '../../utilities/styles';
import {RFValue, RFPercentage} from 'react-native-responsive-fontsize';

const Disclosures = ({onAccept, onDecline}) => {
  const disclosureTitle =
    'By clicking Agree below, you are agreeing to the following disclosures:\n';

  const disclosureList = [
    {
      key: '1',
      body: 'endLicenseAgreement',
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
      <View
        style={{
          paddingVertical: RFValue(10),
          paddingHorizontal: RFValue(10),
          marginTop: RFValue(20),
        }}>
        <Text
          style={[
            styles.header,
            {textAlign: 'center', marginBottom: RFValue(20)},
          ]}>
          Important Disclosures
        </Text>
        <Text style={[styles.bodyText, {fontSize: RFValue(12)}]}>
          {disclosureTitle}
        </Text>

        <ScrollView style={{maxHeight: RFValue(355)}}>
          {/* {disclosureList.map((item, index) => {
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
          })} */}
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              alignSelf: 'center',
              maxWidth: '90%',
            }}>
            <Text style={styles.greenNumbers}>1. </Text>
            <Text style={styles.bodyText}>
              <Text style={{fontFamily: 'Poppins-Bold', fontSize: RFValue(10)}}>
                End-User License Agreement ("Agreement")
              </Text>{' '}
              {'\n'}Last updated: May 25, 2019{'\n\n'}Please read this End-User
              License Agreement ("Agreement") carefully before clicking the "I
              Agree" button, downloading or using Tenley ("Application").{' '}
              {'\n\n'}By clicking the "I Agree" button, downloading or using the
              Application, you are agreeing to be bound by the terms and
              conditions of this Agreement. If you do not agree to the terms of
              this Agreement, do not click on the "I Agree" button and do not
              download or use the Application. {'\n\n'}License. Tenley grants
              you a revocable, non-exclusive, non-transferable, limited license
              to download, install and use the Application solely for your
              personal, non-commercial purposes strictly in accordance with the
              terms of this Agreement.{'\n\n'}Restrictions. You agree not to,
              and you will not permit others to: {'\n   '}a) license, sell,
              rent, lease, assign, distribute, transmit, host, outsource,
              disclose or otherwise commercially exploit the Application or make
              the Application available to any third party. {'\n\n'}The
              Restrictions section is for applying certain restrictions on the
              app usage, e.g. user can't sell app, user can't distribute the
              app. {'\n\n'}
              Modifications to Application. Tenley reserves the right to modify,
              suspend or discontinue, temporarily or permanently, the
              Application or any service to which it connects, with or without
              notice and without liability to you. {'\n\n'}The Modifications to
              Application section is for apps that will be updated or regularly
              maintained.  {'\n\n'}Term and Termination. This Agreement shall
              remain in effect until terminated by you or Tenley.  {'\n\n'}
              Tenley may, in its sole discretion, at any time and for any or no
              reason, suspend or terminate this Agreement with or without prior
              notice. {'\n\n'}This Agreement will terminate immediately, without
              prior notice from Tenley, in the event that you fail to comply
              with any provision of this Agreement. You may also terminate this
              Agreement by deleting the Application and all copies thereof from
              your mobile device or from your desktop. {'\n\n'}Upon termination
              of this Agreement, you shall cease all use of the Application and
              delete all copies of the Application from your mobile device or
              from your desktop.
              {'\n\n'}Severability. If any provision of this Agreement is held
              to be unenforceable or invalid, such provision will be changed and
              interpreted to accomplish the objectives of such provision to the
              greatest extent possible under applicable law and the remaining
              provisions will continue in full force and effect. {'\n\n'}
              Amendments to this Agreement. Tenley reserves the right, at its
              sole discretion, to modify or replace this Agreement at any time.
              If a revision is material we will provide at least 30 (changes
              this) days' notice prior to any new terms taking effect. What
              constitutes a material change will be determined at our sole
              discretion. {'\n\n'}Contact Information. If you have any questions
              about this Agreement, please contact us.{'\n\n'}
            </Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              alignSelf: 'center',
              maxWidth: '90%',
            }}>
            <Text style={styles.greenNumbers}>2. </Text>
            <Text style={styles.bodyText}>
              <Text style={{fontFamily: 'Poppins-Bold', fontSize: RFValue(10)}}>
                Permissions Agreement ("Agreement")
              </Text>{' '}
              {'\n'}Last updated: July 5, 2019{'\n\n'}
              Please read this Permissions Agreement carefully before clicking
              the “I Agree” button, downloading, or using Tenley
              (“Application”). {'\n\n'}By clicking the “I Agree” button,
              downloading, or using the Application, you are agreeing to grant
              Tenley permissions to view your location, contacts, and other
              applications on your device.{' '}
            </Text>
          </View>
        </ScrollView>
        <View style={{height: 20}} />
        {/* <Text style={Typography.textLink}>See more details</Text>

        <View style={{height: 20}} /> */}

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
    maxHeight: RFPercentage(91),
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
    fontSize: RFValue(14),
    alignSelf: 'flex-start',
    marginRight: 10,
  },
  bodyText: {
    ...Typography.bodyText,
    fontSize: RFValue(10),
    alignSelf: 'flex-start',
    paddingTop: 2,
  },
});
