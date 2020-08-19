import React, {useContext, useState} from 'react';
import {
  SafeAreaView,
  ScrollView,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  View,
  Button,
} from 'react-native';
import {GlobalContext} from '../../../GlobalContext';
import {ScreenHeader} from '../../../components/ScreenHeader';
import {colors, Spacing} from '../../../utilities/styles';
import {RFValue, RFPercentage} from 'react-native-responsive-fontsize';
import {TextInput} from '../../../components/Form';
import {useFocusEffect} from '@react-navigation/native';

const AskTenley = ({navigation}) => {
  const [expandQ1, setExpandQ1] = useState(false);
  const [expandQ2, setExpandQ2] = useState(false);
  const [expandQ3, setExpandQ3] = useState(false);

  const [searchQuery, setSearchQuery] = useState('');

  useFocusEffect(
    React.useCallback(() => {
      return () => setSearchQuery('');
    }, []),
  );

  return (
    <>
      <SafeAreaView style={styles.container}>
        <ScreenHeader
          title={'Ask Tenley'}
          navigation={navigation}
          // onPress={() =>
          //   navigation.reset({
          //     index: 3,
          //     routes: [{name: 'Profile'}],
          //   })
          // }
        />
        <ScrollView>
          <View style={styles.rowSpaced}>
            <Image
              source={require('../../../assets/mascot/tenley-mascot4-right.png')}
              resizeMode="contain"
              style={styles.tenleyImage}
            />
            <View style={styles.speechBubble}>
              <Text
                style={[
                  styles.buttonText,
                  {fontSize: RFValue(9), textAlign: 'left'},
                ]}>
                Check out these frequently asked questions, or ask one yourself!
              </Text>
            </View>
          </View>
          <View style={{height: 2, backgroundColor: colors.tenleyGreen}} />
          <View style={{paddingHorizontal: 15, paddingVertical: 20}}>
            <TextInput
              label="What are you looking for?"
              onChangeText={text => setSearchQuery(text)}
              value={searchQuery}
              highlightOnFocus
            />
          </View>
          <View
            style={{borderBottomColor: colors.lightGray, borderBottomWidth: 1}}
          />
          <View style={{paddingHorizontal: 15, paddingVertical: 20}}>
            <TouchableOpacity
              style={styles.button}
              onPress={() => setExpandQ1(!expandQ1)}>
              <View style={styles.row}>
                <Text style={styles.buttonText}>What is a settlement?</Text>
                <Image
                  source={require('../../../assets/icons/carat.png')}
                  style={expandQ1 ? styles.expandCarat : null}
                />
              </View>
              {expandQ1 && (
                <Text style={styles.buttonText}>
                  {'\n'}A settlement of your debt is when the creditor, or debt
                  collector acting on the creditor's behalf, agrees to settle
                  your account for less than the total amount due. Once the
                  settlement is complete, often the creditor, or debt collector
                  acting on the creditor's behalf, will report the account to
                  the credit reporting agencies as settled for less than the
                  full balance or paid in full for less than the full balance.
                </Text>
              )}
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.button}
              onPress={() => setExpandQ2(!expandQ2)}>
              <View style={styles.row}>
                <Text style={styles.buttonText}>
                  How do I negotiate a settlement?
                </Text>
                <Image
                  source={require('../../../assets/icons/carat.png')}
                  style={expandQ2 ? styles.expandCarat : null}
                />
              </View>
              {expandQ2 && (
                <Text style={styles.buttonText}>
                  {'\n'}
                  With Tenley you can make offers to settle an account directly
                  to the creditor, or debt collector acting on behalf of the
                  creditor. Keep in mind, most creditors have limits on
                  settlement offers, therefore any settlement offer below the
                  creditor's minimum settlement will likely be rejected by the
                  creditor, or debt collector acting on their behalf.
                </Text>
              )}
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.button}
              onPress={() => setExpandQ3(!expandQ3)}>
              <View style={styles.row}>
                <Text style={styles.buttonText}>
                  When will my offer be accepted?
                </Text>
                <Image
                  source={require('../../../assets/icons/carat.png')}
                  style={expandQ3 ? styles.expandCarat : null}
                />
              </View>
              {expandQ3 && (
                <Text style={styles.buttonText}>
                  {'\n\n'}
                  As soon as the creditor, or debt collector acting on behalf of
                  the creditor, responds to your offer, Tenley will send you a
                  notification. If you have notifications turned off, a message
                  will appear in the Message section of your Tenley account.
                </Text>
              )}
            </TouchableOpacity>
          </View>
        </ScrollView>
      </SafeAreaView>
    </>
  );
};

export default AskTenley;

const styles = StyleSheet.create({
  container: {
    ...Spacing.defaultContainer,
    justifyContent: 'flex-start',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    alignContent: 'center',
  },
  rowSpaced: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: RFValue(15),
    marginTop: RFValue(15),
  },
  button: {
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: colors.lightGray,
    borderRadius: 5,
    marginVertical: RFValue(5),
    minHeight: RFValue(55),
    padding: RFValue(15),
  },
  buttonText: {
    fontFamily: 'Poppins-Regular',
    color: colors.darkGreen,
    fontSize: RFValue(12),
    letterSpacing: 0.8,
    alignSelf: 'center',
    textAlign: 'left',
  },
  tenleyImage: {
    width: RFValue(90),
    height: RFValue(90),
    alignSelf: 'flex-end',
  },
  speechBubble: {
    height: RFValue(55),
    width: '65%',
    marginVertical: 10,
    borderWidth: 1,
    borderColor: colors.lightGray,
    justifyContent: 'center',
    paddingHorizontal: 15,
  },
  expandCarat: {transform: [{rotate: '90deg'}]},
});
