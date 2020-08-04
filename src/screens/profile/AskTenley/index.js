import React, {useContext} from 'react';
import {
  SafeAreaView,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  View,
  Button,
} from 'react-native';
import {GlobalContext} from '../../../GlobalContext';
import {Header} from '../../../components/Header';
import {ScreenHeader} from '../../../components/ScreenHeader';
import {colors, Spacing} from '../../../utilities/styles';
import {RFValue, RFPercentage} from 'react-native-responsive-fontsize';

const AskTenley = ({navigation}) => {
  return (
    <>
      <SafeAreaView style={styles.container}>
        <ScreenHeader title={'Ask Tenley'} navigation={navigation} />
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
          <TouchableOpacity style={styles.button}>
            <View style={styles.row}>
              <View style={styles.row}>
                <Text style={styles.buttonText}>What is a settlement?</Text>
              </View>
              <Image source={require('../../../assets/icons/carat.png')} />
            </View>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button}>
            <View style={styles.row}>
              <View style={styles.row}>
                <Text style={styles.buttonText}>
                  How do I negotiate a settlement?
                </Text>
              </View>
              <Image source={require('../../../assets/icons/carat.png')} />
            </View>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button}>
            <View style={styles.row}>
              <View style={styles.row}>
                <Text style={styles.buttonText}>
                  When will my offer be accepted?
                </Text>
              </View>
              <Image source={require('../../../assets/icons/carat.png')} />
            </View>
          </TouchableOpacity>
        </View>
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
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  rowSpaced: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: RFValue(15),
    marginTop: RFValue(15),
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
    fontSize: RFValue(12),
    letterSpacing: 0.8,
    alignSelf: 'center',
    textAlign: 'center',
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
});
