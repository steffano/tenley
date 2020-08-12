import React, {useState, useContext} from 'react';
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

const NotificationSettings = ({navigation}) => {
  const [globalData, setGlobalData] = useContext(GlobalContext);
  const {notifications} = globalData;

  const [newMessage, setNewMessage] = useState(
    get(notifications, 'newMessage', true),
  );
  const [upcomingPayment, setUpcomingPayment] = useState(
    get(notifications, 'upcomingPayment', true),
  );
  const [paymentComplete, setPaymentComplete] = useState(
    get(notifications, 'paymentComplete', true),
  );
  const [paidInFull, setPaidInFull] = useState(
    get(notifications, 'paidInFull', true),
  );
  const [bucksEarned, setBucksEarned] = useState(
    get(notifications, 'bucksEarned', true),
  );
  const [newOffer, setNewOffer] = useState(
    get(notifications, 'newOffer', true),
  );
  const [offerAccepted, setOfferAccepted] = useState(
    get(notifications, 'offerAccepted', true),
  );
  const [allowNotifications, setAllowNotifications] = useState(
    get(notifications, 'allowNotifications', true),
  );

  const toggleAll = () => {
    setAllowNotifications(!allowNotifications);
    setNewMessage(!allowNotifications);
    setUpcomingPayment(!allowNotifications);
    setPaymentComplete(!allowNotifications);
    setPaidInFull(!allowNotifications);
    setBucksEarned(!allowNotifications);
    setNewOffer(!allowNotifications);
    setOfferAccepted(!allowNotifications);
  };

  console.log(globalData, 'user');

  const updateSettings = () => {
    setGlobalData({
      ...globalData,
      notifications: {
        allowNotifications,
        newMessage,
        upcomingPayment,
        paymentComplete,
        paidInFull,
        bucksEarned,
        newOffer,
        offerAccepted,
      },
    });
  };

  return (
    <>
      <SafeAreaView style={styles.container}>
        <ScreenHeader
          title={'Notification Settings'}
          navigation={navigation}
          onPress={() => {
            navigation.goBack();
            updateSettings();
          }}
        />
        <View style={{paddingHorizontal: 15, paddingVertical: 20}}>
          <View style={styles.row}>
            <Text style={styles.rowText}>Allow Notifications</Text>
            <Switch value={allowNotifications} onChange={() => toggleAll()} />
          </View>
        </View>

        <View
          style={{borderBottomColor: colors.lightGray, borderBottomWidth: 1}}
        />

        <View style={{paddingHorizontal: 15}}>
          <View style={styles.row}>
            <Text style={styles.rowText}>New message</Text>
            <Switch
              value={newMessage}
              onChange={() => {
                setNewMessage(!newMessage);
              }}
            />
          </View>
          <View style={styles.row}>
            <Text style={styles.rowText}>Upcoming payment reminder</Text>
            <Switch
              value={upcomingPayment}
              onChange={() => setUpcomingPayment(!upcomingPayment)}
            />
          </View>
          <View style={styles.row}>
            <Text style={styles.rowText}>Payment complete</Text>
            <Switch
              value={paymentComplete}
              onChange={() => setPaymentComplete(!paymentComplete)}
            />
          </View>
          <View style={styles.row}>
            <Text style={styles.rowText}>Account paid in full</Text>
            <Switch
              value={paidInFull}
              onChange={() => setPaidInFull(!paidInFull)}
            />
          </View>
          <View style={styles.row}>
            <Text style={styles.rowText}>Tenley Bucks earned</Text>
            <Switch
              value={bucksEarned}
              onChange={() => setBucksEarned(!bucksEarned)}
            />
          </View>
          <View style={styles.row}>
            <Text style={styles.rowText}>New settlement offer</Text>
            <Switch value={newOffer} onChange={() => setNewOffer(!newOffer)} />
          </View>
          <View style={styles.row}>
            <Text style={styles.rowText}>Settlement offer acceptance</Text>
            <Switch
              value={offerAccepted}
              onChange={() => setOfferAccepted(!offerAccepted)}
            />
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
