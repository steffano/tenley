import React, {useState, useEffect} from 'react';
import {TextInput, StyleSheet, View, Text, Animated} from 'react-native';
import {RFPercentage, RFValue} from 'react-native-responsive-fontsize';
import Slider from '@react-native-community/slider';
import {colors} from '../../utilities/styles';

export default ({min, max, title, isCurrency}) => {
  const [calcValue, setCalcValue] = useState(3000);
  // const min = 2000;
  // const max = 15700;
  // const title = 'Total Debt Balance';
  return (
    <>
      <View
        style={{
          width: '100%',
          minHeight: 100,
          // backgroundColor: 'red',
          alignContent: 'center',
          marginVertical: 10,
          paddingVertical: 10,
        }}>
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <Text style={styles.text}>{title}</Text>

          <View style={styles.valueBox}>
            <Text style={[styles.text, {color: colors.tenleyGreen}]}>
              {isCurrency && '$'}
            </Text>

            <Text style={styles.text}>
              {calcValue.toLocaleString(navigator.language, {
                maximumFractionDigits: 0,
              })}
            </Text>
          </View>
        </View>
        <Slider
          style={{width: '100%', height: 40}}
          minimumValue={min}
          maximumValue={max}
          minimumTrackTintColor={colors.tenleyGreen}
          maximumTrackTintColor={colors.lightGray}
          value={calcValue}
          onValueChange={val => setCalcValue(val)}
        />
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <Text style={[styles.text, {fontSize: 11}]}>
            {isCurrency && '$'}
            {min.toLocaleString(navigator.language, {
              maximumFractionDigits: 0,
            })}
          </Text>
          <Text style={[styles.text, {fontSize: 11}]}>
            {isCurrency && '$'}
            {max.toLocaleString(navigator.language, {
              maximumFractionDigits: 0,
            })}
          </Text>
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  text: {
    fontFamily: 'Poppins-Regular',
    color: colors.darkGreen,
    fontSize: 14,
    letterSpacing: 0.9,
  },
  valueBox: {
    height: 41,
    width: 112,
    borderRadius: 5,
    backgroundColor: colors.lightestGray,
    alignItems: 'center',
    justifyContent: 'space-between',
    fontFamily: 'Poppins-Regular',
    flexDirection: 'row',
    paddingHorizontal: 12,
    paddingVertical: 5,
  },
});
