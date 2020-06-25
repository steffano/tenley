import React, {useContext} from 'react';
import {View, Text, Button} from 'react-native';
import Slider from './Slider';

const Calculator = ({navigation}) => {
  return (
    <>
      <View
        style={{
          width: '100%',
          backgroundColor: 'white',
          alignContent: 'center',
          borderRadius: 5,
        }}>
        <Slider
          min={2000}
          max={15700}
          title={'Total Debt Balance'}
          isCurrency
        />
        <Slider min={2000} max={15700} isCurrency title={'Monthly Payment'} />
        <Slider min={1} max={36} title={'Months to Payoff'} />
      </View>
    </>
  );
};

export default Calculator;
