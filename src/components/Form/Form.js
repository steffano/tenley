import React from 'react';
import {View, StyleSheet, Text} from 'react-native';
import {colors} from '../../utilities/styles';
import {RFPercentage, RFValue} from 'react-native-responsive-fontsize';

export default ({children, header, subheader}) => (
  <View style={styles.container}>
    {(header || subheader) && (
      <View style={styles.topRow}>
        {header && <Text style={styles.headerText}>{header}</Text>}
        {subheader && <Text style={styles.subHeaderText}>{subheader}</Text>}
      </View>
    )}
    {children}
  </View>
);

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 20,
    flex: 1,
    marginBottom: 30,
    // height: '100%',
  },
  headerText: {
    marginTop: 25,
    color: colors.darkGreen,
    fontFamily: 'Poppins-Bold',
    fontSize: RFValue(18),
    marginBottom: 5,
    textAlign: 'center',
  },
  topRow: {
    marginBottom: RFValue(15),
  },
  subHeaderText: {
    color: colors.darkGreen,
    fontSize: 20,
    marginBottom: 12,
  },
});
