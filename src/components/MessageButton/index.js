import React from 'react';
import {TouchableOpacity, View, Text, StyleSheet, Image} from 'react-native';
import {colors} from '../../utilities/styles';
import {RFPercentage, RFValue} from 'react-native-responsive-fontsize';

import PropTypes from 'prop-types';

export const MessageButton = ({onPress, subject, date, unread}) => {
  const containerStyle = [styles.container];
  const textStyle = [styles.text];
  const linkStyle = [styles.link];

  if (unread) {
    containerStyle.push(styles.unreadContainer);
    textStyle.push(styles.unreadText);
    linkStyle.push(styles.unreadLink);
  }

  return (
    <TouchableOpacity onPress={onPress} style={containerStyle}>
      <View style={styles.row}>
        <View>
          <Text style={[textStyle, {fontFamily: 'Poppins-Bold'}]}>
            {subject}
          </Text>
          <Text style={textStyle}>{date}</Text>
        </View>

        <View style={[styles.row, {paddingHorizontal: 0}]}>
          <View>
            <Text style={linkStyle}>VIEW</Text>
          </View>
          <Image
            source={require('../../assets/icons/green-arrow.png')}
            // resizeMode="contain"
            style={styles.arrow}
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
    marginHorizontal: 15,
  },
  unreadContainer: {
    backgroundColor: colors.tenleyGreen,
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
  unreadText: {
    color: 'white',
    fontSize: RFValue(12),
    letterSpacing: 1.25,
    fontFamily: 'Poppins-Regular',
  },
  link: {
    fontFamily: 'Poppins-Bold',
    color: colors.mediumGreen,
    fontSize: RFValue(12),
    letterSpacing: 1.25,
  },
  unreadLink: {
    fontFamily: 'Poppins-Bold',
    color: 'white',
    fontSize: RFValue(12),
    letterSpacing: 1.25,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  arrow: {
    width: 10,
    height: 10,
    marginLeft: 5,
  },
});

MessageButton.propTypes = {
  onPress: PropTypes.func,
  accountName: PropTypes.string,
  lastFour: PropTypes.string,
};

MessageButton.defaultProps = {
  onPress: () => {},
};
