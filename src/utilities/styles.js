import React from 'react';
import {StyleSheet, Image} from 'react-native';

export const colors = {
  lightestGray: '#F9F8F6',
  lightGray: '#E1E3E1',
  mediumGray: '#BABABA',
  tenleyGreen: '#19D380',
  lightGreen: '#BEE5C5',
  mediumGreen: '#19A465',
  darkGreen: '#222E25',
  transparentGreen: 'rgba(25,164,101,0.6)',
  inactiveButtonGreen: 'rgba(25,164,101,0.2)',
  orange: '#F3A734',
  white: '#F9F8F6',
  darkRed: '#C73609',
};

export const getScreenOptions = () => {
  return {
    headerStyle: {
      backgroundColor: 'transparent',
    },
    headerBackTitleVisible: false,
    headerBackImage: () => (
      <Image
        source={require('../assets/icons/back-arrow.png')}
        style={{marginLeft: 20}}
      />
    ),
    headerTitleStyle: {
      fontFamily: 'Poppins-Bold',
      letterSpacing: 0.75,
      fontSize: 16,
      lineHeight: 26,
    },
  };
};
