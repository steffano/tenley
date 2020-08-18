import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import Activity from '../Activity';
import TenleyBucks from '../Activity/TenleyBucks';
import {Image} from 'react-native';
import {getScreenOptions} from '../../../utilities/styles';
import PaymentSetup from '../../payments/PaymentSetup';
import PaymentDetails from '../PaymentDetails';
import PaymentActivity from '../PaymentActivity';
import AskTenley from '../../profile/AskTenley';

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

const forFade = ({current}) => ({
  cardStyle: {
    opacity: current.progress,
  },
});

export function ActivityStackScreen() {
  return (
    <ActivityStack.Navigator>
      <ActivityStack.Screen
        options={{headerShown: false}}
        name="Activity"
        component={Activity}
      />
      <ActivityStack.Screen
        options={{headerShown: false}}
        name="PaymentActivity"
        component={PaymentActivity}
      />
      <ActivityStack.Screen
        options={{headerShown: false}}
        name="Payment Details"
        component={PaymentDetails}
      />
      <ActivityStack.Screen
        options={{headerShown: false}}
        name="TenleyBucks"
        component={TenleyBucks}
      />
      {renderScreen('Payment Setup', PaymentSetup)}
      {renderScreen('AskTenley', AskTenley)}
    </ActivityStack.Navigator>
  );
}
