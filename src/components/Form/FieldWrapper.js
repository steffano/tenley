import React from 'react';
import {View, StyleSheet, Text} from 'react-native';
import {RFValue} from 'react-native-responsive-fontsize';
import {colors, Typography} from '../../utilities/styles';

export default ({
  children,
  message,
  messageType,
  highlight,
  invalid,
  removeBorder,
}) => {
  const messageStyles = [styles.messageText];

  const borderStyle = [styles.container];

  if (highlight) {
    borderStyle.push(styles.highlight);
  }
  if (invalid) {
    borderStyle.push(styles.invalid);
  }
  if (removeBorder) {
    borderStyle.push(styles.noBorder);
  }

  return (
    <>
      <View style={borderStyle}>{children}</View>
      {invalid && <Text style={styles.messageText}>{message}</Text>}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderRadius: 6,
    borderColor: colors.lightGray,
    marginVertical: 5,
  },
  highlight: {
    borderWidth: 1,
    borderRadius: 6,
    borderColor: colors.tenleyGreen,
    marginVertical: 5,
  },
  invalid: {
    borderWidth: 1,
    borderRadius: 6,
    borderColor: colors.darkRed,
    marginVertical: 5,
  },
  noBorder: {
    borderWidth: 1,
    borderRadius: 6,
    borderColor: 'transparent',
    marginVertical: 5,
  },
  messageText: {
    ...Typography.errorText,
    paddingBottom: 2,
  },
});
