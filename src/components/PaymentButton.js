import React from 'react';
import {TouchableOpacity, View, Text, StyleSheet, Image} from 'react-native';
import {colors} from '../utilities/styles';
import {RFPercentage, RFValue} from 'react-native-responsive-fontsize';
import moment from 'moment';
import PropTypes from 'prop-types';
import currency from 'currency.js';

export const PaymentButton = ({onPress, payment, account}) => {
  const containerStyle = [styles.container];
  const textStyle = [styles.text];
  const linkStyle = [styles.link];

  // if (unread) {
  //   containerStyle.push(styles.unreadContainer);
  //   textStyle.push(styles.unreadText);
  //   linkStyle.push(styles.unreadLink);
  // }

  const toUSD = value => currency(value, {symbol: '$', precision: 0}).format();

  return (
    <TouchableOpacity onPress={onPress} style={containerStyle}>
      <View style={styles.row}>
        <View>
          <Text style={textStyle}>
            <Text style={[textStyle, {fontFamily: 'Poppins-Bold'}]}>
              {toUSD(payment.amount)}
            </Text>{' '}
            to {account.originalCreditorName}
          </Text>
          <Text style={textStyle}>
            {moment.utc(payment.date).format('MM.DD.YYYY')}
          </Text>
        </View>

        <View style={[styles.row, {paddingHorizontal: 0}]}>
          <View>
            <Text style={linkStyle}>VIEW</Text>
          </View>
          <Image
            source={require('../assets/icons/green-arrow.png')}
            // resizeMode="contain"
            style={{
              width: 10,
              height: 10,
              marginLeft: 5,
            }}
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
});

PaymentButton.propTypes = {
  onPress: PropTypes.func,
  accountName: PropTypes.string,
  lastFour: PropTypes.string,
};

PaymentButton.defaultProps = {
  onPress: () => {},
};
