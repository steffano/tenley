import React, {useState, useEffect} from 'react';
import {
  TextInput,
  StyleSheet,
  View,
  Text,
  Animated,
  Keyboard,
  TouchableWithoutFeedback,
  TouchableOpacity,
  Image,
} from 'react-native';
import {RFPercentage, RFValue} from 'react-native-responsive-fontsize';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import FieldWrapper from './FieldWrapper';
import {colors} from '../../utilities/styles';
import moment from 'moment';
import Modal from 'react-native-modal';
import {TextInputMask} from 'react-native-masked-text';

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
  eyeball,
  tooltip,
  removeBorder,
  isCurrency,
  ...rest
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const [showPicker, setShowPicker] = useState(false);
  const [obscured, setObscured] = useState(eyeball === true);
  const [obscuredTooltip, setObscuredTooltip] = useState(tooltip === true);

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
    let showDate = moment.utc(date).format('MM/DD/YYYY');
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

  const now = moment();

  const maxBday = now.subtract(18, 'years')._d;

  return (
    <>
      <FieldWrapper
        removeBorder={removeBorder}
        highlight={highlightOnFocus && isFocused}
        message={message}
        messageType={messageType}
        invalid={invalid}>
        {!hasChildren && (
          <Animated.Text style={placeholderToLabel}>{label}</Animated.Text>
        )}

        {hasChildren ? (
          <TouchableWithoutFeedback onPress={handleChildren}>
            <View>{children}</View>
          </TouchableWithoutFeedback>
        ) : datePicker ? (
          <TouchableWithoutFeedback onPress={handleDatePicker}>
            <Text style={[inputStyle, {paddingTop: 5}]}>{value}</Text>
          </TouchableWithoutFeedback>
        ) : isCurrency ? (
          <TextInputMask
            style={inputStyle}
            type={'money'}
            onFocus={handleFocus}
            onBlur={handleBlur}
            returnKeyType="done"
            options={{
              precision: 2,
              separator: '.',
              delimiter: ',',
              unit: '$',
              suffixUnit: '',
            }}
            value={value}
            {...rest}
          />
        ) : (
          <TextInput
            secureTextEntry={obscured}
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
        {eyeball && (
          <TouchableOpacity
            onPress={() => setObscured(!obscured)}
            style={styles.eyeballWrapper}>
            <Image
              style={{height: '100%', width: 20}}
              resizeMode="contain"
              source={
                obscured
                  ? require('../../assets/icons/icon-eye-on.png')
                  : require('../../assets/icons/icon-eye-off.png')
              }
            />
          </TouchableOpacity>
        )}
        {tooltip && (
          <>
            <TouchableOpacity
              onPress={() => setObscuredTooltip(!obscuredTooltip)}
              style={{
                height: RFValue(20),
                position: 'absolute',
                right: RFValue(20),
                top: RFValue(15),
                // backgroundColor: 'red',
              }}>
              <Image
                style={{height: '100%', width: 20}}
                resizeMode="contain"
                source={
                  obscuredTooltip
                    ? require('../../assets/icons/info/gray.png')
                    : require('../../assets/icons/info/gold.png')
                }
              />
            </TouchableOpacity>
          </>
        )}
        <Modal
          isVisible={tooltip && !obscuredTooltip}
          animationIn={'fadeInRight'}
          animationOut={'fadeOutRight'}
          backdropOpacity={0}
          onBackdropPress={() => setObscuredTooltip(!obscuredTooltip)}>
          <View
            style={{
              position: 'absolute',
              height: RFValue(78),
              width: RFValue(200),
              right: 0,
              bottom: RFPercentage(48),
            }}>
            <Image
              style={{height: '100%', width: '100%'}}
              resizeMode="contain"
              source={require('../../assets/tooltip.png')}
            />
          </View>
        </Modal>
      </FieldWrapper>
      <DateTimePickerModal
        maximumDate={maxBday}
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
  eyeballWrapper: {
    height: RFValue(16),
    position: 'absolute',
    right: RFValue(20),
    top: RFValue(18),
  },
});
