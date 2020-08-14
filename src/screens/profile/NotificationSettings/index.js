import React, {useState, useContext, useEffect} from 'react';
import {
  SafeAreaView,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  View,
  Button,
  Switch,
} from 'react-native';
import get from 'lodash/get';
import {GlobalContext} from '../../../GlobalContext';
import {Header} from '../../../components/Header';
import {ScreenHeader} from '../../../components/ScreenHeader';
import {colors, Spacing} from '../../../utilities/styles';
import {RFValue, RFPercentage} from 'react-native-responsive-fontsize';
import {Auth} from 'aws-amplify';
import includes from 'lodash/includes';

const NotificationSettings = ({navigation}) => {
  const [globalData, setGlobalData] = useContext(GlobalContext);
  const {user} = globalData;

  const notifAsStrings = user['custom:notificationSettings']
    ? user['custom:notificationSettings'].split(',')
    : ['1', '1', '1', '1', '1', '1', '1'];
  var notif = notifAsStrings.map(Number);

  const [newMessage, setNewMessage] = useState(notif[0]);
  const [upcomingPayment, setUpcomingPayment] = useState(notif[1]);
  const [paymentComplete, setPaymentComplete] = useState(notif[2]);
  const [paidInFull, setPaidInFull] = useState(notif[3]);
  const [bucksEarned, setBucksEarned] = useState(notif[4]);
  const [newOffer, setNewOffer] = useState(notif[5]);
  const [offerAccepted, setOfferAccepted] = useState(notif[6]);
  const [allowNotifications, setAllowNotifications] = useState(
    includes(notif, 1),
  );

  const toggleAll = () => {
    setAllowNotifications(!allowNotifications);
    setNewMessage(!allowNotifications ? 1 : 0);
    setUpcomingPayment(!allowNotifications ? 1 : 0);
    setPaymentComplete(!allowNotifications ? 1 : 0);
    setPaidInFull(!allowNotifications ? 1 : 0);
    setBucksEarned(!allowNotifications ? 1 : 0);
    setNewOffer(!allowNotifications ? 1 : 0);
    setOfferAccepted(!allowNotifications ? 1 : 0);
  };

  const notificationString = [
    newMessage,
    upcomingPayment,
    paymentComplete,
    paidInFull,
    bucksEarned,
    newOffer,
    offerAccepted,
  ].join(',');

  const updateSettings = async () => {
    updateGlobal();
    const u = await Auth.currentAuthenticatedUser();
    try {
      await Auth.updateUserAttributes(u, {
        'custom:notificationSettings': notificationString,
      });
    } catch (err) {
      console.log(err);
    }
  };

  const updateGlobal = () => {
    setGlobalData({
      ...globalData,
      user: {...user, 'custom:notificationSettings': notificationString},
    });
  };

  const renderSwitch = (value, setter) => {
    return (
      <Switch
        value={Boolean(value)}
        onChange={() => {
          setter(value === 0 ? 1 : 0);
          if (!allowNotifications) {
            setAllowNotifications(true);
          }
        }}
      />
    );
  };

  useEffect(() => {
    updateSettings();
    console.log(
      user,
      'useeffect',
      notificationString,
      user['custom:notificationSettings'],
    );
  }, [
    newMessage,
    upcomingPayment,
    paymentComplete,
    paidInFull,
    bucksEarned,
    newOffer,
    offerAccepted,
  ]);

  return (
    <>
      <SafeAreaView style={styles.container}>
        <ScreenHeader title={'Notification Settings'} navigation={navigation} />
        <View style={{paddingHorizontal: 15, paddingVertical: 20}}>
          <View style={styles.row}>
            <Text style={styles.rowText}>Allow Notifications</Text>
            <Switch
              value={
                allowNotifications ||
                newMessage ||
                upcomingPayment ||
                paymentComplete ||
                paidInFull ||
                bucksEarned ||
                newOffer ||
                offerAccepted
              }
              onChange={() => toggleAll()}
            />
          </View>
        </View>

        <View
          style={{borderBottomColor: colors.lightGray, borderBottomWidth: 1}}
        />

        <View style={{paddingHorizontal: 15}}>
          <View style={styles.row}>
            <Text style={styles.rowText}>New message</Text>
            {renderSwitch(newMessage, setNewMessage)}
          </View>
          <View style={styles.row}>
            <Text style={styles.rowText}>Upcoming payment reminder</Text>
            {renderSwitch(upcomingPayment, setUpcomingPayment)}
          </View>
          <View style={styles.row}>
            <Text style={styles.rowText}>Payment complete</Text>
            {renderSwitch(paymentComplete, setPaymentComplete)}
          </View>
          <View style={styles.row}>
            <Text style={styles.rowText}>Account paid in full</Text>
            {renderSwitch(paidInFull, setPaidInFull)}
          </View>
          <View style={styles.row}>
            <Text style={styles.rowText}>Tenley Bucks earned</Text>
            {renderSwitch(bucksEarned, setBucksEarned)}
          </View>
          <View style={styles.row}>
            <Text style={styles.rowText}>New settlement offer</Text>
            {renderSwitch(newOffer, setNewOffer)}
          </View>
          <View style={styles.row}>
            <Text style={styles.rowText}>Settlement offer acceptance</Text>
            {renderSwitch(offerAccepted, setOfferAccepted)}
          </View>
        </View>
      </SafeAreaView>
    </>
  );
};

export default NotificationSettings;

const styles = StyleSheet.create({
  container: {
    ...Spacing.defaultContainer,
    justifyContent: 'flex-start',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: RFValue(10),
  },
  button: {
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: colors.lightGray,
    borderRadius: 5,
    alignContent: 'center',
    marginVertical: RFValue(5),
    minHeight: RFValue(55),
    padding: RFValue(15),
  },
  rowText: {
    fontFamily: 'Poppins-Regular',
    color: colors.darkGreen,
    fontSize: RFValue(12),
    letterSpacing: 0.8,
    alignSelf: 'center',
    textAlign: 'center',
  },
});
