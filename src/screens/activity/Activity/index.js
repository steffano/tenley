import React, {useContext, useState} from 'react';
import {
  SafeAreaView,
  Text,
  View,
  Button,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
// import {GlobalContext} from '../../GlobalContext';
import ActiveUser from '../../accounts/Accounts/ActiveUser';
import {RFValue} from 'react-native-responsive-fontsize';
import {colors} from '../../../utilities/styles';
import {Header} from '../../../components/Header';

const Activity = ({navigation}) => {
  // const [globalData, setGlobalData] = useContext(GlobalContext);

  const [section, setSection] = useState('Payments');

  return (
    <>
      {/* <ActiveUser /> */}
      <SafeAreaView style={{flex: 1}}>
        <View style={styles.headerBar}>
          <Text style={styles.title}>Activity</Text>

          <View
            style={{
              flex: 1,
              flexDirection: 'row',
              justifyContent: 'flex-end',
            }}>
            <TouchableOpacity
              style={[
                styles.headerToggle,
                {
                  borderBottomColor:
                    section === 'Payments' ? colors.tenleyGreen : 'transparent',
                },
              ]}
              onPress={() => setSection('Payments')}>
              <Text style={styles.sectionTitle}>Payments</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.headerToggle,
                {
                  borderBottomColor:
                    section === 'Bucks' ? colors.tenleyGreen : 'transparent',
                },
              ]}
              onPress={() => setSection('Bucks')}>
              <Text style={styles.sectionTitle}>Tenley Bucks</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={{flex: 1, justifyContent: 'center'}}>
          <Text style={{fontFamily: 'VisbyCF-Medium', textAlign: 'center'}}>
            {section}
          </Text>
          <Button
            onPress={() =>
              navigation.navigate('Activity', {screen: 'Payment Log'})
            }
            style={{fontFamily: 'VisbyCF-Medium'}}
            title="Payment Log"
          />
          <Button
            title="test"
            onPress={() => navigation.navigate('PaymentSetup')}
          />
        </View>
      </SafeAreaView>
    </>
  );
};

export default Activity;

const styles = StyleSheet.create({
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
    fontSize: RFValue(16),
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
    fontSize: RFValue(14),
    letterSpacing: 0.88,
    lineHeight: 22,
    textAlign: 'center',
    alignSelf: 'flex-end',
    marginBottom: 5,
  },
});
