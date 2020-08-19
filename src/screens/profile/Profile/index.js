import React, {useContext} from 'react';
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
} from 'react-native';
import {RFValue} from 'react-native-responsive-fontsize';
import {colors, Spacing} from '../../../utilities/styles';
import {GlobalContext} from '../../../GlobalContext';

const Profile = ({navigation}) => {
  const [globalData, setGlobalData] = useContext(GlobalContext);

  return (
    <>
      <SafeAreaView style={{flex: 1, backgroundColor: 'white'}}>
        <View style={styles.headerBar}>
          <Text style={styles.title}>Profile</Text>
        </View>
        <View style={{paddingHorizontal: 15, paddingVertical: 20}}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate('Personal')}>
            <View style={styles.row}>
              <View style={styles.row}>
                <Text style={styles.buttonText}>Account</Text>
              </View>
              <Image source={require('../../../assets/icons/carat.png')} />
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate('Agreements')}>
            <View style={styles.row}>
              <View style={styles.row}>
                <Text style={styles.buttonText}>Agreements</Text>
              </View>
              <Image source={require('../../../assets/icons/carat.png')} />
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate('Notification Settings')}>
            <View style={styles.row}>
              <View style={styles.row}>
                <Text style={styles.buttonText}>Notification Settings</Text>
              </View>
              <Image source={require('../../../assets/icons/carat.png')} />
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate('Change Password')}>
            <View style={styles.row}>
              <View style={styles.row}>
                <Text style={styles.buttonText}>Change Password</Text>
              </View>
              <Image source={require('../../../assets/icons/carat.png')} />
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate('Ask Tenley')}>
            <View style={styles.row}>
              <View style={styles.row}>
                <Image
                  source={require('../../../assets/icons/help-bubble.png')}
                  resizeMode="contain"
                  style={styles.helpIcon}
                />
                <Text style={styles.buttonText}>Ask Tenley</Text>
              </View>
              <Image source={require('../../../assets/icons/carat.png')} />
            </View>
          </TouchableOpacity>
        </View>
        <View style={Spacing.bottomButtonsContainer}>
          <TouchableOpacity onPress={() => setGlobalData({loggedIn: false})}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
                marginBottom: RFValue(15),
              }}>
              <Image source={require('../../../assets/icons/log-out.png')} />
              <Text style={styles.buttonText}>{'  '}Log Out</Text>
            </View>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </>
  );
};

export default Profile;

const styles = StyleSheet.create({
  row: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  button: {
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: colors.lightGray,
    borderRadius: 5,
    alignContent: 'center',
    marginVertical: RFValue(5),
    minHeight: RFValue(55),
    padding: RFValue(15),
  },
  buttonText: {
    fontFamily: 'Poppins-Regular',
    color: colors.darkGreen,
    fontSize: RFValue(13),
    letterSpacing: 0.8,
    alignSelf: 'center',
    textAlign: 'center',
  },
  helpIcon: {
    width: RFValue(30),
    height: RFValue(30),
    alignSelf: 'center',
    marginRight: RFValue(10),
  },
  headerBar: {
    height: 50,
    flexDirection: 'row',
    borderBottomWidth: 2,
    borderBottomColor: colors.lightGray,
    paddingHorizontal: 20,
    marginTop: 10,
    justifyContent: 'flex-start',
  },
  title: {
    color: colors.darkGreen,
    fontFamily: 'Poppins-Bold',
    fontSize: RFValue(16),
    letterSpacing: 0.75,
    textAlign: 'center',
    alignSelf: 'flex-end',
    marginBottom: 5,
  },
});
