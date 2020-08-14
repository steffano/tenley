import React, {useContext, useState} from 'react';
import {
  SafeAreaView,
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
} from 'react-native';
import {GlobalContext} from '../../../GlobalContext';
import ActiveUser from '../../accounts/Accounts/ActiveUser';
import {RFValue} from 'react-native-responsive-fontsize';
import {colors} from '../../../utilities/styles';
import {Header} from '../../../components/Header';
import {Button} from '../../../components/Button';
import {AccountButton} from '../../../components/AccountButton';
import PaymentAccounts from '../PaymentAccounts';
import Modal from 'react-native-modal';
import currency from 'currency.js';
import filter from 'lodash/filter';

const TenleyBucks = ({navigation}) => {
  const [showPaymentPlanModal, setShowPaymentPlanModal] = useState(false);
  const [showPaymentsModal, setShowPaymentsModal] = useState(false);
  const [showShareModal, setShowShareModal] = useState(false);

  const [globalData, setGlobalData] = useContext(GlobalContext);
  const {accounts} = globalData;
  const USD = value => currency(value, {symbol: '$', precision: 0}).format();

  const accountsWithoutSettlements = accounts
    ? accounts.filter(({settlements}) => settlements.length === 0)
    : null;
  const accountsWithoutPayments = accounts
    ? accountsWithoutSettlements.filter(({payments}) => payments.length === 0)
    : null;

  const accountsWithPayments = accounts
    ? accountsWithoutSettlements.filter(({payments}) => payments.length > 0)
    : null;

  const countPayments = () => {
    let a = [];
    accounts.map(account => {
      filter(account.payments, ['status', 'POSTED']).map(payment => {
        a.push(payment);
      });
    });
    console.log(a.length);
    return a.length;
  };

  const paymentsMade = countPayments();
  const paymentsRemaining = 20 - paymentsMade;

  return (
    <>
      <SafeAreaView style={{flex: 1, backgroundColor: 'white'}}>
        <View style={{justifyContent: 'center'}}>
          <View style={{marginVertical: RFValue(10)}}>
            <Text
              style={{
                textAlign: 'center',
                fontSize: RFValue(45),
                fontFamily: 'Poppins-Bold',
                color: colors.tenleyGreen,
              }}>
              {paymentsMade ? '$115' : '$100'}
            </Text>
            <Text
              style={{
                textAlign: 'center',
                fontFamily: 'Poppins-Regular',
                color: colors.darkGreen,
                fontSize: RFValue(11),
                letterSpacing: 1.25,
              }}>
              TOTAL AMOUNT AVAILABLE
            </Text>
          </View>

          <View style={styles.badgeWrap}>
            <View>
              <Image
                source={require('../../../assets/badges/tenley-badge-10pays.png')}
                resizeMode="contain"
                style={styles.badge}
              />
              <Text style={styles.badgeText}>10 Payments</Text>
            </View>
            <View>
              <Image
                source={require('../../../assets/badges/tenley-badge-hardwork.png')}
                resizeMode="contain"
                style={styles.badge}
              />
              <Text style={styles.badgeText}>Hard Worker</Text>
            </View>
            <View>
              <Image
                source={require('../../../assets/badges/tenley-badge-friend.png')}
                resizeMode="contain"
                style={styles.badge}
              />
              <Text style={styles.badgeText}>Helping Friends</Text>
            </View>
          </View>

          <TouchableOpacity
            style={styles.bucksButton}
            onPress={() => setShowShareModal(true)}>
            <Image
              source={require('../../../assets/badges/tenley-icons-friend.png')}
              resizeMode="contain"
              style={styles.iconBadge}
            />
            <Text style={styles.buttonText}>
              Share Tenley with a friend for 5 Bucks
            </Text>
          </TouchableOpacity>

          {paymentsMade === 0 && (
            <TouchableOpacity
              style={styles.bucksButton}
              onPress={() => setShowPaymentPlanModal(true)}>
              <Image
                source={require('../../../assets/badges/tenley-icons-pay_setup.png')}
                resizeMode="contain"
                style={styles.iconBadge}
              />
              <Text style={styles.buttonText}>
                Make a payment today for 15 Bucks
              </Text>
            </TouchableOpacity>
          )}

          <TouchableOpacity
            style={styles.bucksButton}
            onPress={() => setShowPaymentsModal(true)}>
            <Image
              source={require('../../../assets/badges/tenley-icons-20pays.png')}
              resizeMode="contain"
              style={styles.iconBadge}
            />
            <Text style={styles.buttonText}>
              Complete 20 payments for 20 Bucks
            </Text>
          </TouchableOpacity>
        </View>

        <Modal
          isVisible={showShareModal}
          backdropColor={colors.transparentGreen}
          onBackdropPress={() => {
            setShowShareModal(false);
          }}>
          <View style={styles.modalWrap}>
            <TouchableOpacity onPress={() => setShowShareModal(false)}>
              <Image
                source={require('../../../assets/icons/close.png')}
                resizeMode="contain"
                style={styles.closeIcon}
              />
            </TouchableOpacity>
            <Text style={styles.modalHeader}>Share Tenley with a friend!</Text>

            <TouchableOpacity style={styles.bucksButton}>
              <View style={[styles.row, {paddingHorizontal: 15}]}>
                <View style={styles.row}>
                  <Image
                    source={require('../../../assets/icons/imessage-circle.png')}
                    resizeMode="contain"
                    style={styles.shareIcon}
                  />
                  <Text style={styles.shareText}>Text Message</Text>
                </View>

                <Image source={require('../../../assets/icons/carat.png')} />
              </View>
            </TouchableOpacity>
            <TouchableOpacity style={styles.bucksButton}>
              <View style={[styles.row, {paddingHorizontal: 15}]}>
                <View style={styles.row}>
                  <Image
                    source={require('../../../assets/icons/twitter-circle.png')}
                    resizeMode="contain"
                    style={styles.shareIcon}
                  />
                  <Text style={styles.shareText}>Twitter</Text>
                </View>

                <Image source={require('../../../assets/icons/carat.png')} />
              </View>
            </TouchableOpacity>
            <TouchableOpacity style={styles.bucksButton}>
              <View style={[styles.row, {paddingHorizontal: 15}]}>
                <View style={styles.row}>
                  <Image
                    source={require('../../../assets/icons/link-circle.png')}
                    resizeMode="contain"
                    style={styles.shareIcon}
                  />
                  <Text style={styles.shareText}>Copy Link</Text>
                </View>

                <Image source={require('../../../assets/icons/carat.png')} />
              </View>
            </TouchableOpacity>
          </View>
        </Modal>

        <Modal
          isVisible={showPaymentsModal}
          backdropColor={colors.transparentGreen}
          onBackdropPress={() => {
            setShowPaymentsModal(false);
          }}>
          <View style={styles.modalWrap}>
            <TouchableOpacity onPress={() => setShowPaymentsModal(false)}>
              <Image
                source={require('../../../assets/icons/close.png')}
                resizeMode="contain"
                style={styles.closeIcon}
              />
            </TouchableOpacity>
            <Text style={styles.modalHeader}>Complete 20 Payments</Text>
            <Text style={styles.modalSubheader}>
              You've completed {paymentsMade} payments, make {'\n'}
              {paymentsRemaining} more to earn this badge!
            </Text>
            <View
              style={{
                marginVertical: RFValue(15),
                flexDirection: 'row',
                flexWrap: 'wrap',
                justifyContent: 'center',
              }}>
              {Array(paymentsMade)
                .fill()
                .map(index => {
                  return (
                    <Image
                      source={require('../../../assets/icons/done/green.png')}
                      style={styles.checkmark}
                      key={index}
                    />
                  );
                })}
              {Array(paymentsRemaining)
                .fill()
                .map(index => {
                  return (
                    <Image
                      source={require('../../../assets/icons/done/gray.png')}
                      style={styles.checkmark}
                      key={index}
                    />
                  );
                })}
            </View>

            <Button
              title="View Accounts"
              onPress={() => {
                setShowPaymentsModal(false);
                navigation.navigate('Accounts', {screen: 'Accounts'});
              }}
            />
          </View>
        </Modal>

        <Modal
          isVisible={showPaymentPlanModal}
          backdropColor={colors.transparentGreen}
          onBackdropPress={() => {
            setShowPaymentPlanModal(false);
          }}>
          <View style={styles.modalWrap}>
            <TouchableOpacity onPress={() => setShowPaymentPlanModal(false)}>
              <Image
                source={require('../../../assets/icons/close.png')}
                resizeMode="contain"
                style={styles.closeIcon}
              />
            </TouchableOpacity>

            <Text style={styles.modalHeader}>Set Up a Payment Plan</Text>
            {accounts.length !== 0 && (
              <Text style={styles.modalSubheader}>
                Select an account to begin
              </Text>
            )}
            <View style={{height: RFValue(10)}} />

            {accountsWithoutPayments.slice(0, 2).map((account, key) => {
              return (
                account && (
                  <AccountButton
                    key={key}
                    account={account}
                    navigation={navigation}
                    accountName={account.originalCreditorName}
                    lastFour={account.originalCreditorAccountNumber.slice(-4)}
                    balance={USD(account.amountOwed)}
                    onPress={() => {
                      setShowPaymentPlanModal(false);
                      navigation.navigate('Account Details', {account});
                    }}
                  />
                )
              );
            })}
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('Accounts');
                setShowPaymentPlanModal(false);
              }}>
              <Text style={styles.greenLink}>
                {accounts.length === 0
                  ? 'Add your accounts to begin'
                  : 'View all accounts'}
              </Text>
            </TouchableOpacity>
          </View>
        </Modal>
      </SafeAreaView>
    </>
  );
};

export default TenleyBucks;

const styles = StyleSheet.create({
  row: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  modalHeader: {
    color: colors.darkGreen,
    fontFamily: 'Poppins-Bold',
    fontSize: RFValue(13),
    letterSpacing: 0.75,
    lineHeight: 26,
    textAlign: 'center',
    alignSelf: 'center',
    marginBottom: 5,
  },
  modalSubheader: {
    color: colors.darkGreen,
    fontFamily: 'Poppins-Regular',
    fontSize: RFValue(9),
    letterSpacing: 0.75,
    textAlign: 'center',
    alignSelf: 'center',
    marginBottom: 5,
  },
  modalWrap: {
    backgroundColor: 'white',
    borderRadius: 5,
    padding: RFValue(15),
  },
  badgeWrap: {
    backgroundColor: colors.white,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingBottom: RFValue(15),
    paddingHorizontal: RFValue(15),
    margin: RFValue(10),
    borderRadius: 5,
    alignSelf: 'center',
  },
  badge: {
    width: RFValue(70),
    height: RFValue(70),
    alignSelf: 'center',
    margin: RFValue(15),
  },
  badgeText: {
    fontFamily: 'Poppins-Regular',
    color: colors.darkGreen,
    fontSize: RFValue(10),
    textAlign: 'center',
    letterSpacing: 0.8,
  },
  iconBadge: {
    width: RFValue(60),
    height: RFValue(60),
    alignSelf: 'flex-start',
  },
  shareIcon: {
    width: RFValue(30),
    height: RFValue(30),
    alignSelf: 'flex-start',
    marginVertical: 15,
    marginRight: 15,
  },
  shareText: {
    color: colors.darkGreen,
    fontFamily: 'Poppins-Regular',
    fontSize: RFValue(13),
    letterSpacing: 0.75,
    textAlign: 'left',
  },
  bucksButton: {
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: colors.lightGray,
    borderRadius: 5,
    marginHorizontal: RFValue(15),
    alignContent: 'center',
    marginVertical: RFValue(10),
  },
  buttonText: {
    fontFamily: 'Poppins-Bold',
    color: colors.mediumGreen,
    fontSize: RFValue(10),
    letterSpacing: 0.8,
    alignSelf: 'center',
    textAlign: 'center',
    marginHorizontal: 15,
  },
  closeIcon: {
    height: 15,
    width: 15,
    alignSelf: 'flex-end',
  },
  checkmark: {
    margin: 6,
  },
  greenLink: {
    color: colors.mediumGreen,
    fontFamily: 'Poppins-Medium',
    letterSpacing: 1.25,
    textDecorationLine: 'underline',
    fontSize: RFValue(10),
    textAlign: 'center',
    marginVertical: RFValue(10),
  },
});
