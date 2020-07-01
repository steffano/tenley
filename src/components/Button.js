import React from 'react';
import {TouchableOpacity, Text, StyleSheet} from 'react-native';
import {colors} from '../utilities/styles';
import {RFPercentage, RFValue} from 'react-native-responsive-fontsize';

import PropTypes from 'prop-types';

export const Button = ({
  onPress,
  title,
  secondary,
  disabled,
  textOnly,
  style,
}) => {
  const containerStyle = [styles.container];
  const textStyle = [styles.text];

  if (secondary) {
    containerStyle.push(styles.secondaryContainer);
  }
  if (disabled) {
    containerStyle.push(styles.disabledContainer);
  }
  if (textOnly) {
    containerStyle.push(styles.textOnlyContainer);
    textStyle.push(styles.textOnly);
  }

  return (
    <TouchableOpacity
      onPress={onPress || null}
      style={[containerStyle, style]}
      disabled={disabled}>
      <Text style={textStyle}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.mediumGreen,
    justifyContent: 'center',
    borderRadius: 6,
    borderWidth: 1,
    borderColor: colors.mediumGreen,
    marginVertical: 5,
    height: RFValue(55),
  },
  secondaryContainer: {
    backgroundColor: colors.orange,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: colors.orange,
    marginVertical: 5,
    paddingHorizontal: 10,
    height: RFValue(55),
  },
  disabledContainer: {
    backgroundColor: colors.lightGreen,
    paddingVertical: RFValue(17),
    borderRadius: 6,
    borderWidth: 1,
    borderColor: colors.lightGreen,
    marginVertical: 5,
    paddingHorizontal: 10,
  },
  textOnlyContainer: {
    backgroundColor: 'transparent',
    borderColor: 'transparent',
    height: RFValue(45),
  },
  text: {
    color: 'white',
    alignSelf: 'center',
    fontSize: RFValue(16),
    letterSpacing: 1.25,
    fontFamily: 'Poppins-Bold',
  },
  textOnly: {
    color: colors.darkGreen,
    alignSelf: 'center',
    fontSize: RFValue(12),
    fontFamily: 'Poppins-Regular',
    textDecorationLine: 'underline',
    letterSpacing: 1.4,
  },
});

Button.propTypes = {
  onPress: PropTypes.func,
  title: PropTypes.string,
  secondary: PropTypes.bool,
  disabled: PropTypes.bool,
  textOnly: PropTypes.bool,
};

Button.defaultProps = {
  onPress: () => {},
  title: null,
  secondary: false,
  disabled: false,
};
