import React, {useContext, useEffect, useState} from 'react';
import {
  View,
  SafeAreaView,
  Text,
  TouchableWithoutFeedback,
  Image,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import Calculator from '../../../components/Calculator';
import {Button} from '../../../components/Button';
import {GreenModal} from '../../../components/Modal';
import {RFPercentage, RFValue} from 'react-native-responsive-fontsize';
import {colors, Spacing, Typography} from '../../../utilities/styles';
import {Auth} from 'aws-amplify';

const ActiveUser = ({navigation}) => {
  const [showCalculator, setShowCalculator] = useState(false);
  const totalDebt = 10000;
  const [debtBalance, setDebtBalance] = useState(totalDebt);
  const bucksTotal = debtBalance - 100;

  const savingsPercentage = Math.floor(
    ((totalDebt - bucksTotal) / totalDebt) * 100,
  );

  const [showSelectAccount, setShowSelectAccount] = useState(false);
  const [showGraph, setShowGraph] = useState(false);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        style={{backgroundColor: 'white'}}
        contentInsetAdjustmentBehavior="automatic"
        contentContainerStyle={{flexGrow: 1}}>
        <SafeAreaView>
          <View style={styles.greenWrap}>
            <View
              style={[
                styles.middleBlock,
                {borderTopColor: 'transparent', paddingVertical: 0},
              ]}>
              <View style={{marginLeft: 15}}>
                <Text style={styles.header}>Tenley's advice!</Text>
                <Text style={styles.subheader}>
                  See how fast you can pay off your{'\n'}debts, or save by
                  negotiating a {'\n'}lower rate with your creditor.
                </Text>
              </View>
              <Image
                source={require('../../../assets/mascot/tenley-mascot4-left.png')}
                resizeMode="contain"
                style={styles.tenleyImage}
              />
            </View>
            {!showCalculator ? (
              <View style={[styles.whiteWrap, {paddingVertical: 5}]}>
                <TouchableWithoutFeedback
                  style={{paddingVertical: 15}}
                  onPress={() => setShowCalculator(true)}>
                  <Text style={styles.subheader}>
                    What if I lowered my total debt to{' '}
                    <Text style={styles.underlineText}>$10,000</Text>?
                  </Text>
                </TouchableWithoutFeedback>
              </View>
            ) : (
              <>
                <View style={styles.whiteWrap}>
                  <Calculator
                    totalDebt={totalDebt}
                    debtBalance={debtBalance}
                    setDebtBalance={setDebtBalance}>
                    <View style={{flexDirection: 'row'}}>
                      <View style={styles.infoBlock} />
                      <TouchableWithoutFeedback
                        onPress={() => setShowGraph(true)}>
                        <Text style={styles.tinyText}>
                          The average Tenley user is able to negotiate their
                          debt down by 15%.{' '}
                          <Text style={styles.linkText}>VIEW GRAPH</Text>
                        </Text>
                      </TouchableWithoutFeedback>
                    </View>
                  </Calculator>

                  <View style={styles.middleBlock}>
                    <Image
                      source={require('../../../assets/icons/tenley-bucks.png')}
                      resizeMode="contain"
                      style={styles.bucksIcon}
                    />
                    <View
                      style={{
                        paddingHorizontal: 15,
                        paddingVertical: 10,
                        maxWidth: '90%',
                      }}>
                      <Text style={styles.text}>Earn 100 Tenley Bucks</Text>
                      <Text style={[styles.text, {fontSize: 10}]}>
                        Tenley Bucks you earn can be used to boost your payments
                        towards your debt!
                      </Text>
                    </View>
                  </View>
                  <View style={styles.bottomBlock}>
                    <Text style={styles.text}>
                      The final total amount you would pay is{' '}
                      <Text style={{fontFamily: 'Poppins-Bold'}}>
                        $
                        {bucksTotal.toLocaleString(navigator.language, {
                          maximumFractionDigits: 0,
                        })}
                      </Text>
                      , for a savings of{' '}
                      <Text style={{fontFamily: 'Poppins-Bold'}}>
                        {savingsPercentage === 0 ? 1 : savingsPercentage}%
                      </Text>
                      .
                    </Text>
                  </View>
                </View>
                <View style={{width: '100%', marginTop: 20}}>
                  <Button
                    secondary
                    title="Get Started"
                    onPress={() => setShowSelectAccount(true)}
                  />
                  <Button
                    textOnly
                    title="Close"
                    onPress={() => setShowCalculator(false)}
                  />
                </View>
              </>
            )}
          </View>

          <View
            style={{
              backgroundColor: colors.lightGray,
              flex: 1,
              minWidth: 200,
              minHeight: 75,
              marginHorizontal: 15,
              marginVertical: 10,
              borderRadius: 5,
            }}
          />

          <View
            style={{
              borderColor: colors.lightGray,
              borderWidth: 2,
              flex: 1,
              minWidth: 200,
              minHeight: 125,
              marginHorizontal: 15,
              marginVertical: 10,
              borderRadius: 5,
            }}
          />
          <View
            style={{
              borderColor: colors.lightGray,
              borderWidth: 2,
              flex: 1,
              minWidth: 200,
              minHeight: 125,
              marginHorizontal: 15,
              marginVertical: 10,
              borderRadius: 5,
            }}
          />
        </SafeAreaView>
      </ScrollView>
      <GreenModal
        closeOnX
        onClose={() => setShowSelectAccount(false)}
        visible={showSelectAccount}
        key={1}
        style={{height: '35%', width: '80%'}}>
        <Text style={styles.header}>Select an account</Text>
        <Text style={styles.subheader}>
          To begin payments or a settlement negotiation, select an account to
          view.
        </Text>
        <Button title="Citibank 1234" />
        <Button title="Citibank 1234" />
      </GreenModal>
      <GreenModal
        closeOnX
        onClose={() => setShowGraph(false)}
        visible={showGraph}
        key={1}
        style={{height: '50%'}}>
        <Image
          source={require('../../../assets/graph.png')}
          resizeMode="contain"
          style={{height: '90%', width: '90%', padding: 20}}
        />
      </GreenModal>
    </SafeAreaView>
  );
};

export default ActiveUser;

const styles = StyleSheet.create({
  container: {
    ...Spacing.defaultContainer,
  },
  greenWrap: {
    maxWidth: '100%',
    backgroundColor: colors.lightGreen,
    alignItems: 'center',
    flex: 1,
    padding: 15,
    borderRadius: 5,
    marginHorizontal: 15,
    marginVertical: 15,
  },
  whiteWrap: {
    backgroundColor: 'white',
    alignContent: 'center',
    justifyContent: 'center',
    borderRadius: 5,
    width: '100%',
  },
  middleBlock: {
    borderBottomWidth: 1,
    borderTopWidth: 1,
    borderBottomColor: colors.lightGray,
    borderTopColor: colors.lightGray,
    paddingVertical: 10,
    flexDirection: 'row',
  },
  bottomBlock: {
    borderRadius: 5,
    paddingVertical: 15,
    alignItems: 'center',
  },
  text: {
    color: colors.darkGreen,
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    letterSpacing: 0.8,
    paddingHorizontal: 15,
  },
  header: {
    fontFamily: 'Poppins-Bold',
    letterSpacing: 0.9,
    fontSize: 16,
    color: colors.darkGreen,
  },
  subheader: {
    fontFamily: 'Poppins-Regular',
    fontSize: RFValue(10),
    letterSpacing: 0.5,
    marginVertical: 10,
    alignSelf: 'center',
    color: colors.darkGreen,
    lineHeight: RFValue(15),
  },
  accountButton: {
    width: '90%',
    borderWidth: 1,
    borderColor: colors.lightGray,
    borderRadius: 5,
    marginVertical: 10,
  },
  underlineText: {
    fontFamily: 'Poppins-Bold',
    textDecorationLine: 'underline',
  },
  tinyText: {
    color: colors.darkGreen,
    fontFamily: 'Poppins-Regular',
    fontSize: RFValue(8),
    letterSpacing: 0.8,
    paddingHorizontal: 10,
    paddingTop: 10,
  },
  tenleyImage: {
    width: RFValue(100),
    height: RFValue(100),
    alignSelf: 'flex-end',
  },
  infoBlock: {
    marginTop: 15,
    height: 10,
    width: 10,
    borderRadius: 100,
    backgroundColor: colors.mediumGreen,
  },
  linkText: {
    fontFamily: 'Poppins-Bold',
    textDecorationLine: 'underline',
    color: colors.mediumGreen,
  },
  bucksIcon: {
    width: RFValue(30),
    height: RFValue(30),
    alignSelf: 'center',
    marginLeft: 20,
    // marginTop: 10,
  },
});
