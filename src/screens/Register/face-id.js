import React, {useContext} from 'react';
import {View, Text, SafeAreaView, StyleSheet} from 'react-native';
import {Button} from '../../components/Button';
import {GlobalContext} from '../../GlobalContext';
import {RFValue, RFPercentage} from 'react-native-responsive-fontsize';
import {colors, Spacing} from '../../utilities/styles';

const FaceId = () => {
  const [globalData, setGlobalData] = useContext(GlobalContext);

  return (
    <>
      <SafeAreaView style={styles.container}>
        <Text style={[styles.headerText, {textAlign: 'center'}]}>
          Authentication
        </Text>
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignContent: 'center',
          }}>
          <Text style={styles.headerText}>Add Face ID</Text>
          <Text style={styles.subHeaderText}>
            Turn on Face ID to be used in place of your email and password on
            log in to the mobile app. This will not permanently replace your
            email and password.
          </Text>
        </View>
        <View style={styles.bottomButtonsContainer}>
          <Button
            title="Enable Face ID"
            onPress={() => setGlobalData({loggedIn: true})}
          />
          <Button
            textOnly
            title="SKIP"
            onPress={() => setGlobalData({loggedIn: true})}
          />
        </View>
      </SafeAreaView>
    </>
  );
};

export default FaceId;

const styles = StyleSheet.create({
  container: {
    ...Spacing.defaultContainer,
  },
  headerText: {
    marginVertical: 20,
    paddingHorizontal: 15,
    color: colors.darkGreen,
    fontFamily: 'Poppins-Bold',
    fontSize: RFValue(16),
    letterSpacing: 0.5,
  },
  topRow: {
    marginBottom: RFValue(20),
  },
  subHeaderText: {
    fontFamily: 'Poppins-Regular',
    color: colors.darkGreen,
    fontSize: RFValue(12),
    marginBottom: 20,
    letterSpacing: 0.88,
    paddingHorizontal: 15,
  },
  bottomButtonsContainer: {
    flex: 1,
    paddingHorizontal: 15,
    justifyContent: 'flex-end',
  },

  root: {flex: 1, padding: 20},
  title: {textAlign: 'center', fontSize: 30},
  codeFieldRoot: {marginTop: 10},
  cell: {
    width: RFPercentage(6.5),
    height: 70,
    lineHeight: 70,
    borderWidth: 1,
    borderRadius: 6,
    borderColor: colors.lightGray,
    textAlign: 'center',
    fontSize: RFValue(35),
    fontFamily: 'Poppins-Bold',
    marginTop: 0,
    marginHorizontal: 5,
    color: colors.tenleyGreen,
  },
  focusCell: {
    borderColor: colors.lightGray,
  },
});
