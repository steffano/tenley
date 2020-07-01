import * as Colors from './colors';
import * as Spacing from './spacing';
import {RFValue} from 'react-native-responsive-fontsize';

export const extraLargeFontSize = 32;
export const largeFontSize = 20;
export const buttonFontSize = 18;
export const baseFontSize = RFValue(13);
export const smallFontSize = RFValue(12);
export const smallestFontSize = RFValue(10);
export const largeHeaderFontSize = 20;
export const headerFontSize = 18;
export const smallHeaderFontSize = RFValue(14);

const base = {
  alignItems: 'center',
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'center',
  fontFamily: 'Poppins-Regular',
};

export const bodyText = {
  fontFamily: 'Poppins-Regular',
  color: Colors.baseText,
  fontSize: smallFontSize,
  letterSpacing: 0.6,
};

export const headerText = {
  color: Colors.darkGreen,
  fontFamily: 'Poppins-Bold',
  fontSize: smallHeaderFontSize,
  marginVertical: Spacing.large,
  textAlign: 'center',
  letterSpacing: 0.75,
};

export const subheaderText = {
  color: Colors.darkGreen,
  fontFamily: 'Poppins-Regular',
  fontSize: baseFontSize,
  textAlign: 'center',
  letterSpacing: 0.75,
};

export const descriptionText = {
  color: Colors.baseText,
  fontSize: smallFontSize,
};

export const screenHeader = {
  ...base,
  color: Colors.baseText,
  fontSize: largeFontSize,
  fontWeight: 'bold',
};

export const errorText = {
  color: Colors.darkRed,
  paddingHorizontal: Spacing.smaller,
  fontSize: smallestFontSize,
  letterSpacing: 1.25,
  fontFamily: 'Poppins-Medium',
};

export const boldGreen = {
  color: Colors.tenleyGreen,
  fontFamily: 'Poppins-Bold',
  fontSize: smallHeaderFontSize,
};

export const screenFooter = {
  ...base,
  ...descriptionText,
};

export const sectionHeader = {
  ...base,
  ...headerText,
};
export const sectionSubheader = {
  ...base,
  ...subheaderText,
};

export const count = {
  ...base,
  ...descriptionText,
};

export const textLink = {
  marginTop: Spacing.smallest,
  textDecorationLine: 'underline',
  fontFamily: 'Poppins-Medium',
  fontSize: smallFontSize,
  color: Colors.darkGreen,
  marginHorizontal: Spacing.small,
};
