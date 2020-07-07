import React, {useState, useEffect} from 'react';
import {
  TextInput,
  StyleSheet,
  View,
  Text,
  Animated,
  Keyboard,
  TouchableWithoutFeedback,
} from 'react-native';
import {RFPercentage, RFValue} from 'react-native-responsive-fontsize';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import FieldWrapper from './FieldWrapper';
import {colors} from '../../utilities/styles';
import moment from 'moment';

export default ({
  label,
  message,
  messageType,
  highlightOnFocus,
  value,
  invalid,
  datePicker,
  setDateValue,
  hasChildren,
  children,
  ...rest
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const [showPicker, setShowPicker] = useState(false);

  const handleFocus = () => {
    setIsFocused(true);
  };
  const handleBlur = () => {
    setIsFocused(false);
  };

  const handleDatePicker = () => {
    setIsFocused(true);
    setShowPicker(true);
    Keyboard.dismiss();
  };

  const handleChildren = () => {
    setIsFocused(true);
  };

  const setDate = date => {
    let showDate = moment(date).format('MM/DD/YYYY');
    // let postDate = moment(value).format('YYYY-MM-DD');
    setIsFocused(false);
    setShowPicker(false);
    setDateValue(showDate);
  };

  const animatedLabelValue = new Animated.Value(value === '' ? 0 : 1);
  const inputStyle = [styles.textInput];

  useEffect(() => {
    Animated.timing(animatedLabelValue, {
      toValue: isFocused || value !== '' ? 1 : 0,
      duration: 200,
      useNativeDriver: false,
    }).start();
  }, [isFocused, value]);

  const placeholderToLabel = {
    position: 'absolute',
    left: 15,
    fontFamily: 'Poppins-Medium',
    top: animatedLabelValue.interpolate({
      inputRange: [0, 1],
      outputRange: [styles.placeholderStyle.top, styles.labelStyle.top],
    }),
    color: animatedLabelValue.interpolate({
      inputRange: [0, 1],
      outputRange: [styles.placeholderStyle.color, styles.labelStyle.color],
    }),
    fontSize: animatedLabelValue.interpolate({
      inputRange: [0, 1],
      outputRange: [
        styles.placeholderStyle.fontSize,
        styles.labelStyle.fontSize,
      ],
    }),
    letterSpacing: animatedLabelValue.interpolate({
      inputRange: [0, 1],
      outputRange: [
        styles.placeholderStyle.letterSpacing,
        styles.labelStyle.letterSpacing,
      ],
    }),
  };
  return (
    <>
      <FieldWrapper
        highlight={highlightOnFocus && isFocused}
        message={message}
        messageType={messageType}
        invalid={invalid}>
        <Animated.Text style={placeholderToLabel}>{label}</Animated.Text>

        {hasChildren ? (
          <TouchableWithoutFeedback>
            <View onPress={handleChildren}>{children}</View>
          </TouchableWithoutFeedback>
        ) : datePicker ? (
          <TouchableWithoutFeedback onPress={handleDatePicker}>
            <Text style={[inputStyle, {paddingTop: 5}]}>{value}</Text>
          </TouchableWithoutFeedback>
        ) : (
          <TextInput
            returnKeyType="done"
            style={inputStyle}
            {...rest}
            selectionColor={colors.tenleyGreen}
            onFocus={handleFocus}
            onBlur={handleBlur}
            value={value}
            blurOnSubmit
          />
        )}
      </FieldWrapper>
      <DateTimePickerModal
        maximumDate={new Date()}
        isVisible={showPicker}
        mode="date"
        onConfirm={date => setDate(date)}
        onCancel={() => {
          setShowPicker(false);
          handleBlur();
        }}
      />
    </>
  );
};

const styles = StyleSheet.create({
  textInput: {
    fontSize: RFValue(14),
    fontFamily: 'Poppins-Bold',
    color: colors.darkGreen,
    letterSpacing: 0.75,
    marginTop: RFValue(22),
    marginHorizontal: 15,
    height: RFValue(29),
  },
  labelStyle: {
    top: RFValue(8),
    fontSize: RFValue(10),
    color: colors.darkGreen,
    letterSpacing: 1.25,
  },
  placeholderStyle: {
    top: RFValue(17),
    color: '#aaa',
    fontSize: RFValue(12),
    letterSpacing: 1.75,
  },
});
