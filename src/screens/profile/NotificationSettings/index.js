import React, {useState} from 'react';
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
import {GlobalContext} from '../../../GlobalContext';
import {Header} from '../../../components/Header';
import {ScreenHeader} from '../../../components/ScreenHeader';
import {colors, Spacing} from '../../../utilities/styles';
import {RFValue, RFPercentage} from 'react-native-responsive-fontsize';

const NotificationSettings = ({navigation}) => {
  const [newMessage, setNewMessage] = useState(false);
  const [upcomingPayment, setUpcomingPayment] = useState(false);
  const [paymentComplete, setPaymentComplete] = useState(false);
  const [paidInFull, setPaidInFull] = useState(false);
  const [bucksEarned, setBucksEarned] = useState(false);
  const [newOffer, setNewOffer] = useState(false);
  const [offerAccepted, setOfferAccepted] = useState(false);

  const [allowNotifications, setAllowNotifications] = useState(false);

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

  return (
    <>
      <SafeAreaView style={styles.container}>
        <ScreenHeader title={'Notification Settings'} navigation={navigation} />
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
              onChange={() => setNewMessage(!newMessage)}
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
