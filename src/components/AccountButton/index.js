import React from 'react';
import {TouchableOpacity, View, Text, StyleSheet, Image} from 'react-native';
import {colors} from '../../utilities/styles';
import {RFValue} from 'react-native-responsive-fontsize';

import PropTypes from 'prop-types';

export const AccountButton = ({
  onPress,
  accountName,
  lastFour,
  notification,
  balance,
}) => {
  const containerStyle = [styles.container];

  if (notification) {
    containerStyle.push(styles.notificationContainer);
  }

  return (
    <TouchableOpacity onPress={onPress || null} style={containerStyle}>
      <View style={styles.row}>
        <View style={styles.title}>
          <Text style={[styles.text, {maxWidth: RFValue(170)}]}>
            {accountName}
            {' \u2022 '}
            {lastFour}
          </Text>
          {notification && (
            <View style={styles.notificationBubble}>
              <Text style={styles.notificationText}>1</Text>
            </View>
          )}
        </View>
        <View style={styles.row}>
          {balance && <Text style={styles.balanceText}>{balance}</Text>}
          <Image
            source={require('../../assets/icons/carat.png')}
            resizeMode="contain"
            style={styles.carat}
          />
        </View>
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
  },
  notificationContainer: {
    backgroundColor: 'white',
    justifyContent: 'center',
    borderRadius: 6,
    borderWidth: 1,
    borderColor: colors.tenleyGreen,
    marginVertical: 5,
    height: RFValue(60),
  },
  text: {
    color: colors.darkGreen,
    fontSize: RFValue(12),
    letterSpacing: 1.25,
    fontFamily: 'Poppins-Regular',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 15,
  },
  title: {
    justifyContent: 'center',
    flexDirection: 'row',
    alignContent: 'center',
    alignItems: 'center',
  },
  notificationBubble: {
    height: 22,
    width: 22,
    borderRadius: 100,
    backgroundColor: colors.tenleyGreen,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 15,
  },
  notificationText: {
    fontFamily: 'Poppins-Bold',
    color: 'white',
    fontSize: RFValue(13),
  },
  balanceText: {
    color: colors.darkGreen,
    fontFamily: 'Poppins-Bold',
    fontSize: RFValue(14),
    marginRight: RFValue(15),
  },
  carat: {
    maxWidth: 20,
    maxHeight: 20,
  },
});

AccountButton.propTypes = {
  onPress: PropTypes.func,
  accountName: PropTypes.string,
  lastFour: PropTypes.string,
  notification: PropTypes.bool,
  balance: PropTypes.string,
};

AccountButton.defaultProps = {
  onPress: () => {},
  accountName: '',
  lastFour: '',
  notification: false,
};
