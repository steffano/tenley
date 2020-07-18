import React, {useContext, useState} from 'react';
import {
  View,
  Text,
  Button,
  StyleSheet,
  TouchableWithoutFeedback,
} from 'react-native';
import Slider from './Slider';
import {RFValue, RFPercentage} from 'react-native-responsive-fontsize';
import {colors} from '../../utilities/styles';
import Modal from 'react-native-modal';
import AverageGraph from '../Modals/average-graph';

const Calculator = ({
  navigation,
  totalDebt,
  debtBalance,
  setDebtBalance,
  showTotalDebt,
  payment,
  setPayment,
  months,
  setMonths,
}) => {
  // const [debtBalance, setDebtBalance] = useState(totalDebt);
  // const [payment, setPayment] = useState(totalDebt * 0.5);
  // const [months, setMonths] = useState(totalDebt / payment);
  const [showGraph, setShowGraph] = useState(false);

  const updateDebtBalance = val => {
    if (isNaN(val)) {
      console.log('yo');
      // const num = parseInt(val.replace(/[^\d\.\-]/g, ''));
      // setDebtBalance(Number(num));
      // setPayment(Math.ceil(Number(num) / months / 10) * 10);
    } else {
      setDebtBalance(val);
      setPayment(Math.ceil(val / months / 10) * 10);
    }
  };

  const updatePayment = val => {
    setPayment(val);
    setMonths(Math.ceil(debtBalance / val));
  };

  const updateMonths = val => {
    setMonths(Math.ceil(val));
    setPayment(Math.ceil(debtBalance / val / 10) * 10);
  };

  return (
    <>
      {showTotalDebt && (
        <>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              paddingHorizontal: 15,
              paddingVertical: 15,
            }}>
            <Text style={styles.text}>Total Debt</Text>

            <View style={styles.valueBox}>
              <Text style={[styles.text, {color: colors.tenleyGreen}]}>$</Text>

              <Text style={styles.text}>
                {totalDebt.toLocaleString(navigator.language, {
                  maximumFractionDigits: 0,
                })}
              </Text>
            </View>
          </View>
        </>
      )}
      <View
        style={{
          width: '100%',
          backgroundColor: 'white',
          alignContent: 'center',
          borderRadius: 5,
          padding: 15,
        }}>
        <Slider
          min={Math.ceil(totalDebt * 0.4)}
          max={totalDebt}
          total={debtBalance}
          onSlide={updateDebtBalance}
          title={showTotalDebt ? 'Settle For' : 'Your Offer'}
          isCurrency
        />

        <View style={{flexDirection: 'row'}}>
          <View style={styles.infoBlock} />
          <TouchableWithoutFeedback onPress={() => setShowGraph(true)}>
            <Text style={styles.tinyText}>
              The average Tenley user is able to negotiate their debt down by
              15%. <Text style={styles.linkText}>VIEW GRAPH</Text>
            </Text>
          </TouchableWithoutFeedback>
        </View>
        <View style={{height: 30}} />
        <Slider
          min={Math.ceil(debtBalance / 36 / 10) * 10}
          max={debtBalance}
          total={payment}
          onSlide={updatePayment}
          isCurrency
          title={'Monthly Payment'}
        />
        <View style={{height: 30}} />

        <Slider
          min={1}
          max={36}
          total={months}
          onSlide={updateMonths}
          title={'Months to Payoff'}
        />
      </View>
      <Modal
        isVisible={showGraph}
        backdropColor={colors.transparentGreen}
        onBackdropPress={() => setShowGraph(false)}>
        <AverageGraph onClose={() => setShowGraph(false)} />
      </Modal>
    </>
  );
};

export default Calculator;

const styles = StyleSheet.create({
  text: {
    fontFamily: 'Poppins-Bold',
    color: colors.darkGreen,
    fontSize: RFValue(12),
    letterSpacing: 0.9,
    alignSelf: 'center',
  },
  valueBox: {
    height: 41,
    width: RFPercentage(15),
    borderRadius: 5,
    // borderWidth: 1,
    // borderColor: colors.tenleyGreen,
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
  tinyText: {
    color: colors.darkGreen,
    fontFamily: 'Poppins-Regular',
    fontSize: RFValue(8),
    letterSpacing: 0.8,
    paddingHorizontal: 10,
    paddingTop: 10,
  },
  tenleyImage: {
    width: RFValue(100),
    height: RFValue(100),
    alignSelf: 'flex-end',
  },
  infoBlock: {
    marginTop: 15,
    height: 10,
    width: 10,
    borderRadius: 100,
    backgroundColor: colors.mediumGreen,
  },
  linkText: {
    fontFamily: 'Poppins-Bold',
    textDecorationLine: 'underline',
    color: colors.mediumGreen,
  },
});
