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
import {ScreenHeader} from '../../../components/ScreenHeader';
import {colors, Spacing} from '../../../utilities/styles';
import {RFValue, RFPercentage} from 'react-native-responsive-fontsize';

const Agreements = ({navigation}) => {
  return (
    <>
      <SafeAreaView style={styles.container}>
        <ScreenHeader title={'Agreements'} navigation={navigation} />
        <View style={{paddingHorizontal: 15, paddingVertical: 20}}>
          <TouchableOpacity style={styles.button}>
            <View style={styles.row}>
              <View style={styles.row}>
                <Text style={styles.buttonText}>Disclosures</Text>
              </View>
              <Image source={require('../../../assets/icons/carat.png')} />
            </View>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button}>
            <View style={styles.row}>
              <View style={styles.row}>
                <Text style={styles.buttonText}>Communications</Text>
              </View>
              <Image source={require('../../../assets/icons/carat.png')} />
            </View>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button}>
            <View style={styles.row}>
              <View style={styles.row}>
                <Text style={styles.buttonText}>Settlements</Text>
              </View>
              <Image source={require('../../../assets/icons/carat.png')} />
            </View>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </>
  );
};

export default Agreements;

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
});
