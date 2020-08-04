import React, {useContext, useState} from 'react';
import {GlobalContext} from '../../GlobalContext';
import {SafeAreaView, Text, View, StyleSheet, Image} from 'react-native';
import {colors, Spacing} from '../../utilities/styles';
import {Button} from '../../components/Button';
import {RFValue, RFPercentage} from 'react-native-responsive-fontsize';
import {ScreenHeader} from '../../components/ScreenHeader';
import {Calendar, LocaleConfig} from 'react-native-calendars';
import moment from 'moment';
import RNPickerSelect from 'react-native-picker-select';

const SchedulePayment = ({navigation, route}) => {
  const [date, setDate] = useState(moment().format('YYYY-MM-DD'));

  const [globalData, setGlobalData] = useContext(GlobalContext);

  const user = globalData.user;

  const [withdrawalAccount, setWithdrawalAccount] = useState(
    user['custom:demo_bankAcct'] || null,
  );

  console.log(route.params);

  const calendarTheme = {
    textSectionTitleColor: colors.darkGreen,
    dayTextColor: colors.darkGreen,
    todayTextColor: colors.darkGreen,
    monthTextColor: colors.darkGreen,
    arrowColor: colors.mediumGreen,
    textDisabledColor: colors.mediumGray,
    textDayFontFamily: 'Poppins-Regular',
    textDayHeaderFontFamily: 'Poppins-Regular',
    textMonthFontFamily: 'Poppins-Regular',
    textDayFontSize: RFValue(14),
    textMonthFontSize: RFValue(14),
    textDayHeaderFontSize: RFValue(14),
    'stylesheet.calendar.main': {
      week: {
        marginTop: RFValue(0),
        marginBottom: 0,
        flexDirection: 'row',
        justifyContent: 'space-around',
      },
    },
    'stylesheet.calendar.header': {
      header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingLeft: 10,
        paddingRight: 10,
        marginTop: RFValue(5),
        alignItems: 'center',
      },
      monthText: {
        fontSize: RFValue(15),
        fontFamily: 'Poppins-Regular',
        margin: 0,
        color: colors.darkGreen,
      },
    },
  };

  LocaleConfig.locales['en'] = {
    formatAccessibilityLabel: "dddd d 'of' MMMM 'of' yyyy",
    monthNames: [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December',
    ],
    monthNamesShort: [
      'jan',
      'feb',
      'mar',
      'apr',
      'may',
      'jun',
      'jul',
      'aug',
      'sep',
      'oct',
      'nov',
      'dec',
    ],
    dayNames: [
      'Sunday',
      'Monday',
      'Tuesday',
      'Wednesday',
      'Thursday',
      'Friday',
      'Saturday',
    ],
    dayNamesShort: ['S', 'M', 'T', 'W', 'T', 'F', 'S'],
  };
  LocaleConfig.defaultLocale = 'en';

  const pickerData = [
    {
      label: 'Bi-Weekly',
      value: 'twiceWeekly',
    },
    {
      label: 'Twice Monthly',
      value: 'twiceMonthlyByDate',
    },
    {
      label: 'Monthly',
      value: 'monthlyByDate',
    },
    {
      label: 'Every 4 Weeks',
      value: 'everyNWeeks',
    },
  ];

  const [frequency, setFrequency] = useState('');

  const {paymentType, account, paymentAmount, months} = route.params;

  return (
    <>
      <SafeAreaView style={styles.container}>
        <ScreenHeader
          title={
            paymentType === 'oneTime' ? 'Schedule Payment' : 'Schedule Payments'
          }
          navigation={navigation}
        />
        {/* <View> */}
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginHorizontal: RFValue(15),
            marginTop: RFValue(15),
          }}>
          <Image
            source={require('../../assets/mascot/tenley-mascot4-right.png')}
            resizeMode="contain"
            style={styles.tenleyImage}
          />
          <View
            style={{
              height: RFValue(70),
              width: '65%',
              marginVertical: 10,
              borderWidth: 1,
              borderColor: colors.lightGray,
              justifyContent: 'center',
              paddingHorizontal: 15,
            }}>
            <Text style={styles.text}>
              Your {paymentType === 'recurring' ? 'first ' : null}transfer will
              occur on
            </Text>
            <Text
              style={{
                fontFamily: 'Poppins-Bold',
                letterSpacing: 0.8,
                fontSize: RFValue(12),
              }}>
              {moment(date).format('MMMM D, YYYY')}
            </Text>
          </View>
        </View>
        <View style={{height: 2, backgroundColor: colors.tenleyGreen}} />
        <View
          style={{
            flex: 4,
          }}>
          <Calendar
            minDate={moment().format('YYYY-MM-DD')}
            calendarHeight={RFValue(200)}
            style={styles.calendar}
            onDayPress={day => setDate(day.dateString)}
            markedDates={{
              [date]: {
                selected: true,
                disableTouchEvent: true,
                selectedColor: colors.mediumGreen,
                selectedTextColor: 'white',
              },
            }}
            theme={calendarTheme}
          />
          {paymentType === 'recurring' && (
            // <View>
            <RNPickerSelect
              pickerProps={{
                style: {
                  height: 200,
                  overflow: 'hidden',
                },
              }}
              placeholder={{
                label: 'Select Frequency',
                value: '',
                color: 'gray',
              }}
              onDonePress={console.log(frequency)}
              value={frequency}
              doneText={'Done'}
              onValueChange={value => setFrequency(value)}
              items={pickerData}
              useNativeAndroidPickerStyle={false}
              style={{
                inputIOS: [styles.input],
                inputAndroid: {
                  fontFamily: 'Poppins-Regular',
                  fontSize: RFValue(13),
                },
                inputAndroidContainer: [styles.input],
                placeholder: {
                  fontFamily: 'Poppins-Regular',
                  color: '#666666',
                  fontSize: RFValue(13),
                },
                iconContainer: {
                  top: 33,
                  right: 50,
                },
              }}
              Icon={() => {
                return (
                  <Image
                    source={require('../../assets/icons/carat.png')}
                    resizeMode="contain"
                    style={{
                      height: RFValue(10),
                      width: RFValue(10),
                      margin: 0,
                      transform: [{rotate: '90deg'}],
                    }}
                  />
                );
              }}
            />
            // </View>
          )}
        </View>

        <View style={Spacing.bottomButtonsContainer}>
          {!withdrawalAccount ? (
            <Button
              // disabled={paymentType === 'recurring' ? frequency === '' : false}
              title="Next Step: Bank Account"
              onPress={() =>
                navigation.navigate('BankSetup', {
                  account,
                  paymentType,
                  paymentAmount,
                  months: paymentType === 'recurring' ? months : null,
                  paymentDate: date,
                  frequency,
                })
              }
            />
          ) : (
            <Button
              disabled={paymentType === 'recurring' ? frequency === '' : false}
              title="Payment Confirmation"
              onPress={() =>
                navigation.navigate('PaymentConfirmation', {
                  account,
                  paymentType,
                  paymentAmount,
                  months: paymentType === 'recurring' ? months : null,
                  paymentDate: date,
                  frequency,
                })
              }
            />
          )}
        </View>
      </SafeAreaView>
    </>
  );
};

export default SchedulePayment;

const styles = StyleSheet.create({
  container: {
    ...Spacing.defaultContainer,
  },
  bottomButtonsContainer: {
    flex: 1,
    paddingHorizontal: 15,
    justifyContent: 'flex-end',
    marginBottom: 10,
  },
  tenleyImage: {
    width: RFValue(90),
    height: RFValue(90),
    alignSelf: 'flex-end',
  },
  text: {
    fontFamily: 'Poppins-Regular',
    letterSpacing: 0.8,
    fontSize: RFValue(10),
  },
  inputWrap: {
    backgroundColor: 'red',
    flex: 1,
    width: '100%',
    margin: 10,
    justifyContent: 'center',
    alignContent: 'center',
  },
  input: {
    borderRadius: RFValue(5),
    marginHorizontal: RFValue(15),
    marginVertical: RFValue(10),
    paddingHorizontal: RFValue(15),
    justifyContent: 'center',
    color: colors.darkGreen,
    fontFamily: 'Poppins-Regular',
    fontSize: RFValue(13),
    letterSpacing: 0.8,
    borderColor: colors.lightGray,
    height: RFValue(45),
    borderWidth: 1,
  },
});
