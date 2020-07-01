import React, {useContext, useState} from 'react';
import {View, Text, Button} from 'react-native';
import Slider from './Slider';
import {colors} from '../../utilities/styles';

const Calculator = ({
  navigation,
  totalDebt,
  debtBalance,
  setDebtBalance,
  children,
}) => {
  // const [debtBalance, setDebtBalance] = useState(totalDebt);
  const [payment, setPayment] = useState(totalDebt * 0.5);
  const [months, setMonths] = useState(totalDebt / payment);

  const updateDebtBalance = val => {
    setDebtBalance(val);
    setPayment(Math.ceil(val / months / 10) * 10);
  };

  const updatePayment = val => {
    setPayment(val);
    setMonths(Math.ceil(debtBalance / val));
  };

  const updateMonths = val => {
    setMonths(val);
    setPayment(Math.ceil(debtBalance / val / 10) * 10);
  };

  return (
    <>
      <View
        style={{
          width: '100%',
          backgroundColor: 'white',
          alignContent: 'center',
          borderRadius: 5,
          padding: 15,
        }}>
        <Slider
          min={totalDebt * 0.4}
          max={totalDebt}
          total={debtBalance}
          onSlide={updateDebtBalance}
          title={'Total Debt Balance'}
          isCurrency
        />

        {children}
        <View style={{height: 40}} />
        <Slider
          min={Math.ceil(debtBalance / 36 / 10) * 10}
          max={debtBalance}
          total={payment}
          onSlide={updatePayment}
          isCurrency
          title={'Monthly Payment'}
        />
        <View style={{height: 40}} />

        <Slider
          min={1}
          max={36}
          total={months}
          onSlide={updateMonths}
          title={'Months to Payoff'}
        />
      </View>
    </>
  );
};

export default Calculator;
