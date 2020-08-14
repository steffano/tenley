import React, {useContext, useState, useRef} from 'react';
import {
  SafeAreaView,
  Text,
  StyleSheet,
  View,
  TouchableOpacity,
} from 'react-native';
import {Spacing, Typography} from '../../../utilities/styles';
import {colors} from '../../../utilities/styles';
import {Button} from '../../../components/Button';
import {ScreenHeader} from '../../../components/ScreenHeader';
import {RFValue} from 'react-native-responsive-fontsize';
// import {GlobalContext} from '../../GlobalContext';

const Verification = ({navigation}) => {
  // const [globalData, setGlobalData] = useContext(GlobalContext);

  const [selected, setSelected] = useState(0);

  return (
    <>
      <SafeAreaView style={styles.container}>
        <ScreenHeader title={'Auto Add Accounts'} navigation={navigation} />
        <Text style={styles.blockText}>
          Great, you’re almost done! Confirm your identity by selecting which of
          these addresses you’ve previously lived at.
        </Text>

        <TouchableOpacity
          onPress={() => setSelected(1)}
          style={[
            styles.addressBlock,
            selected === 1 ? styles.selected : null,
          ]}>
          <Text
            style={[
              styles.addressText,
              selected === 1 ? styles.selected : null,
            ]}>
            2447 N Halsted St{'\n'}Chicago, IL 60614
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => setSelected(2)}
          style={[
            styles.addressBlock,
            selected === 2 ? styles.selected : null,
          ]}>
          <Text
            style={[
              styles.addressText,
              selected === 2 ? styles.selected : null,
            ]}>
            601 Gregory Street{'\n'}Apt 2{'\n'}Normal, IL 61761
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => setSelected(3)}
          style={[
            styles.addressBlock,
            selected === 3 ? styles.selected : null,
          ]}>
          <Text
            style={[
              styles.addressText,
              selected === 3 ? styles.selected : null,
            ]}>
            669 N Michigan Ave{'\n'}Chicago, IL 60611
          </Text>
        </TouchableOpacity>

        <View style={Spacing.bottomButtonsContainer}>
          <Button
            disabled={selected === 0}
            title="Submit"
            onPress={() => navigation.navigate('Load Accounts')}
          />
        </View>
      </SafeAreaView>
    </>
  );
};

export default Verification;

const styles = StyleSheet.create({
  container: {
    ...Spacing.defaultContainer,
  },
  blockText: {
    ...Typography.subheaderText,
    textAlign: 'left',
    marginVertical: RFValue(20),
    marginHorizontal: RFValue(25),
  },
  bottomButtonsContainer: {
    flex: 1,
    paddingHorizontal: 15,
    justifyContent: 'flex-end',
    marginBottom: 15,
  },
  addressBlock: {
    borderWidth: 1,
    borderColor: colors.lightGray,
    backgroundColor: 'white',
    marginHorizontal: 15,
    marginVertical: 10,
    padding: RFValue(15),
    borderRadius: 5,
    justifyContent: 'center',
  },
  addressText: {
    color: colors.darkGreen,
    fontFamily: 'Poppins-Bold',
    fontSize: RFValue(13),
    letterSpacing: 0.75,
  },
  selected: {
    backgroundColor: colors.mediumGreen,
    color: 'white',
  },
});
