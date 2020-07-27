import React from 'react';
import {TouchableOpacity, View, Text, StyleSheet, Image} from 'react-native';
import {colors} from '../utilities/styles';
import {RFPercentage, RFValue} from 'react-native-responsive-fontsize';
import Bullet from './Bullet';

import PropTypes from 'prop-types';

export const AccountButton = ({
  onPress,
  accountName,
  lastFour,
  notification,
  clearNotification,
}) => {
  const containerStyle = [styles.container];

  if (notification) {
    containerStyle.push(styles.notificationContainer);
  }
  return (
    <TouchableOpacity onPress={onPress || null} style={containerStyle}>
      <View style={styles.row}>
        <View
          style={[
            styles.row,
            {paddingHorizontal: 0, justifyContent: 'center'},
          ]}>
          <Text style={[styles.text, {maxWidth: 220}]}>
            {accountName}
            {/* <Bullet small color={colors.darkGreen} /> */} - {lastFour}
          </Text>
          {notification && (
            <View style={styles.notificationBubble}>
              <Text style={styles.notificationText}>1</Text>
            </View>
          )}
        </View>

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
  notificationContainer: {
    backgroundColor: 'white',
    justifyContent: 'center',
    borderRadius: 6,
    borderWidth: 1,
    borderColor: colors.tenleyGreen,
    marginVertical: 5,
    height: RFValue(60),
    marginHorizontal: 15,
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
    paddingHorizontal: 20,
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
});

AccountButton.propTypes = {
  onPress: PropTypes.func,
  accountName: PropTypes.string,
  lastFour: PropTypes.string,
  newMessage: PropTypes.bool,
};

AccountButton.defaultProps = {
  onPress: () => {},
  accountName: '',
  lastFour: '',
  newMessage: false,
};
