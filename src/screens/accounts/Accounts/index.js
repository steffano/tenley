import React, {useContext, useEffect, useState} from 'react';
import {
  View,
  SafeAreaView,
  Text,
  Button,
  TouchableWithoutFeedback,
  Image,
  StyleSheet,
  ScrollView,
} from 'react-native';
import Slider from '../../../components/Calculator/Slider';
import Calculator from '../../../components/Calculator';
import {RFPercentage, RFValue} from 'react-native-responsive-fontsize';
import {colors} from '../../../utilities/styles';
import {Auth} from 'aws-amplify';

const Accounts = ({navigation}) => {
  const [showCalculator, setShowCalculator] = useState(false);

  useEffect(() => {
    const notFunction = async () => {
      const result = await Auth.currentAuthenticatedUser();
      console.log(result);
    };
    notFunction();
  }, []);

  return (
    <SafeAreaView
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
      }}>
      {/* <ScrollView contentContainerStyle={{height: 300, width: '100%'}}> */}
      <View style={styles.greenWrap}>
        <View
          style={{
            flexDirection: 'row',
            width: '100%',
            justifyContent: 'space-between',
          }}>
          <View style={{maxWidth: '60%'}}>
            <Text style={styles.header}>Tenley's advice!</Text>
            <Text style={styles.subheader}>
              See how fast you can pay off your debts, or save by negotiating a
              lower rate with your creditor.
            </Text>
          </View>
          <Image
            source={require('../../../assets/mascot/tenley-mascot4-left.png')}
            resizeMode="contain"
            style={{
              width: 150,
              height: 150,
              // backgroundColor: 'black',
              alignSelf: 'flex-end',
            }}
          />
        </View>

        <View style={styles.whiteWrap}>
          {!showCalculator && (
            <TouchableWithoutFeedback onPress={() => setShowCalculator(true)}>
              <Text>What if I lowered my total debt to $10,000?</Text>
            </TouchableWithoutFeedback>
          )}
          {showCalculator && (
            <>
              <Calculator />
              <View>
                <Text>You could earn 100 Tenley Bucks</Text>
                <Text>
                  Tenley Bucks you earn can be used to boost your payments
                  towards your debt!
                </Text>
              </View>
              <View>
                <Text>
                  The final total amount you would pay is $9,900, for a savings
                  of 37%.
                </Text>
              </View>
            </>
          )}
        </View>
        {showCalculator && (
          <>
            <Button
              title="get started"
              onPress={() => setShowCalculator(false)}
            />
            <Button title="close" onPress={() => setShowCalculator(false)} />
          </>
        )}
      </View>
      {/* <Text style={{fontFamily: 'VisbyCF-Medium'}}>Calculator</Text>
        <Button
          onPress={() =>
            navigation.navigate('Accounts', {screen: 'Account Details'})
          }
          style={{fontFamily: 'VisbyCF-Medium'}}
          title="Account Details"
        /> */}
      {/* <Slider min={2000} max={15700} title={'Title'} /> */}
      {/* </ScrollView> */}
    </SafeAreaView>
  );
};

export default Accounts;

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.mediumGreen,
    paddingVertical: RFValue(17),
    borderRadius: 6,
    borderWidth: 1,
    borderColor: colors.mediumGreen,
    marginVertical: 5,
    paddingHorizontal: RFValue(10),
  },
  greenWrap: {
    width: '90%',
    backgroundColor: colors.lightGreen,
    alignItems: 'center',
    position: 'absolute',
    top: 70,
    padding: 5,
    borderRadius: 5,
  },
  whiteWrap: {
    width: '90%',
    backgroundColor: 'white',
    alignContent: 'center',
    padding: 20,
    borderRadius: 5,
  },
  header: {
    fontFamily: 'Poppins-Bold',
    letterSpacing: 0.9,
    fontSize: 16,
  },
  subheader: {
    fontFamily: 'Poppins-Regular',
    fontSize: 13,
    marginTop: 10,
  },
});
