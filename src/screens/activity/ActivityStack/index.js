import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import Activity from '../Activity';
import PaymentsLog from '../PaymentsLog';
import {Image} from 'react-native';
import {getScreenOptions} from '../../../utilities/styles';
import PaymentSetup from '../../payments/PaymentSetup';

const ActivityStack = createStackNavigator();

const renderScreen = (name, component, withHeader) => {
  return (
    <ActivityStack.Screen
      name={name}
      component={component}
      options={withHeader ? getScreenOptions() : {headerShown: false}}
    />
  );
};

export function ActivityStackScreen() {
  return (
    <ActivityStack.Navigator>
      <ActivityStack.Screen
        options={{headerShown: false}}
        name="Activity Home"
        component={Activity}
      />
      <ActivityStack.Screen
        options={getScreenOptions()}
        name="Payment Log"
        component={PaymentsLog}
      />
      {renderScreen('Payment Setup', PaymentSetup)}
    </ActivityStack.Navigator>
  );
}
