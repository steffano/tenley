import React, {useState, useEffect} from 'react';
import {TextInput, StyleSheet, View, Text, Animated} from 'react-native';
import {RFPercentage, RFValue} from 'react-native-responsive-fontsize';
import Slider from 'react-native-slider';
import {colors} from '../../utilities/styles';
import currency from 'currency.js';

export default ({min, max, title, total, isCurrency, onSlide, onType}) => {
  const [calcValue, setCalcValue] = useState(
    total.toLocaleString(navigator.language, {
      maximumFractionDigits: 0,
    }),
  );
  const [showCalcValue, setShowCalcValue] = useState(false);

  // const min = 2000;
  // const max = 15700;
  // const title = 'Total Debt Balance';

  // console.log(total, calcValue, 'total#######');

  const handleDone = () => {
    const val = parseInt(calcValue);
    if (val <= max && val >= min) {
      onSlide(val);
      setShowCalcValue(false);
    } else {
      setShowCalcValue(false);
    }
  };

  const USD = value => currency(value, {symbol: '$', precision: 0}).format();

  return (
    <>
      <View
        style={{
          width: '100%',
          minHeight: 100,
          alignContent: 'center',
        }}>
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <Text style={styles.text}>{title}</Text>

          <View style={styles.valueBox}>
            <Text style={[styles.text, {color: colors.tenleyGreen}]}>
              {isCurrency && '$'}
            </Text>

            <TextInput
              selectionColor={colors.tenleyGreen}
              onFocus={() => {
                setShowCalcValue(true);
                setCalcValue('');
              }}
              onBlur={() => handleDone()}
              returnKeyType="done"
              style={[
                styles.text,
                {width: '100%', height: '100%', textAlign: 'right'},
              ]}
              keyboardType={'numeric'}
              value={
                showCalcValue
                  ? calcValue
                  : total.toLocaleString(navigator.language, {
                      maximumFractionDigits: 0,
                    })
              }
              onChangeText={text => {
                setCalcValue(text);
              }}
              onSubmitEditing={handleDone}
            />
          </View>
        </View>
        <Slider
          style={{width: '100%', height: 40}}
          minimumValue={min}
          maximumValue={max}
          minimumTrackTintColor={colors.tenleyGreen}
          maximumTrackTintColor={colors.lightGray}
          value={total}
          onValueChange={onSlide}
          step={isCurrency ? 10 : null}
          thumbStyle={styles.thumb}
          trackStyle={styles.track}
        />
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <Text style={[styles.text, {fontSize: 11}]}>
            {isCurrency ? USD(min) : min}
          </Text>
          <Text style={[styles.text, {fontSize: 11}]}>
            {isCurrency ? USD(max) : max}
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
    fontSize: RFValue(12),
    letterSpacing: 0.9,
    alignSelf: 'center',
  },
  valueBox: {
    height: 41,
    width: RFPercentage(15),
    borderRadius: 5,
    backgroundColor: colors.lightestGray,
    alignItems: 'center',
    justifyContent: 'space-between',
    fontFamily: 'Poppins-Regular',
    flexDirection: 'row',
    paddingHorizontal: 12,
    paddingVertical: 5,
  },
  thumb: {
    height: 25,
    width: 25,
    borderRadius: 100,
    backgroundColor: colors.tenleyGreen,
    borderWidth: 4,
    borderColor: colors.white,
  },
  track: {
    height: 8,
    borderRadius: 20,
  },
});
