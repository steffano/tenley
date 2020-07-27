import * as colors from './colors';
import {RFValue, RFPercentage} from 'react-native-responsive-fontsize';

export const hairline = 1;
export const tiny = 3;
export const smallest = 5;
export const smaller = 8;
export const small = RFValue(10);
export const base = RFValue(15);
export const large = 20;
export const larger = 24;
export const largest = 28;
export const extraLarge = 50;

export const sectionPadding = small;

export const defaultContainer = {
  flex: 1,
  height: RFPercentage(100),
  justifyContent: 'center',
  backgroundColor: 'white',
};

export const blockContainer = {paddingHorizontal: base, marginTop: base};

export const greenLine = {
  height: RFValue(2),
  backgroundColor: colors.tenleyGreen,
};

export const horizontalBase = {paddingHorizontal: base};

export const bottomButtonsContainer = {
  flex: 1,
  paddingHorizontal: base,
  justifyContent: 'flex-end',
  marginBottom: small,
};
