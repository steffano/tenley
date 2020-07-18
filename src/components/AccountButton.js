import React from 'react';
import {TouchableOpacity, View, Text, StyleSheet, Image} from 'react-native';
import {colors} from '../utilities/styles';
import {RFPercentage, RFValue} from 'react-native-responsive-fontsize';
import Bullet from './Bullet';

import PropTypes from 'prop-types';

export const AccountButton = ({onPress, accountName, lastFour}) => {
  return (
    <TouchableOpacity onPress={onPress || null} style={styles.container}>
      <View style={styles.row}>
        <Text style={styles.text}>
          {accountName} - {lastFour}
        </Text>
        <Bullet />
        <Image
          source={require('../assets/icons/carat.png')}
          resizeMode="contain"
          style={{
            maxWidth: 20,
            maxHeight: 20,
          }}
        />
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    justifyContent: 'center',
    borderRadius: 6,
    borderWidth: 1,
    borderColor: colors.lightGray,
    marginVertical: 5,
    height: RFValue(60),
    marginHorizontal: 15,
  },
  text: {
    color: colors.darkGreen,
    fontSize: RFValue(13),
    letterSpacing: 1.25,
    fontFamily: 'Poppins-Regular',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignContent: 'center',
    alignItems: 'center',
    padding: 25,
  },
});

AccountButton.propTypes = {
  onPress: PropTypes.func,
  accountName: PropTypes.string,
  lastFour: PropTypes.string,
};

AccountButton.defaultProps = {
  onPress: () => {},
};
