import React from 'react';
import {TouchableOpacity, Image} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import Accounts from '../Accounts';
import AccountDetails from '../AccountDetails';
import AutoAdd from '../AutoAdd';
import ManualAdd from '../ManualAdd';
import ImportLoading from '../Accounts/ImportLoading';
import Verification from '../AutoAdd/Verification';
import Negotiation from '../Negotiation';
import {
  BankLogin,
  BankSetup,
  PaymentCalculator,
  PaymentConfirmation,
  PaymentSetup,
  PaymentSummary,
  SchedulePayment,
} from '../../payments';
const AccountsStack = createStackNavigator();

const getScreenOptions = () => {
  return {
    headerStyle: {
      shadowColor: 'transparent',
    },
    headerMode: 'screen',
    headerBackTitleVisible: false,
    headerBackImage: () => (
      <Image
        source={require('../../../assets/icons/back-arrow.png')}
        style={{marginLeft: 20}}
      />
    ),
    headerTitleStyle: {
      fontFamily: 'Poppins-Bold',
      letterSpacing: 0.75,
      fontSize: 16,
      lineHeight: 26,
    },
  };
};

const renderScreen = (name, component, withHeader) => {
  return (
    <AccountsStack.Screen
      name={name}
      component={component}
      options={withHeader ? {tabBarVisible: false} : {headerShown: false}}
    />
  );
};

export function AccountsStackScreen() {
  return (
    <AccountsStack.Navigator>
      <AccountsStack.Screen
        options={{headerShown: false}}
        name="Accounts Home"
        component={Accounts}
      />
      <AccountsStack.Screen
        name="Account Details"
        component={AccountDetails}
        options={getScreenOptions()}
      />
      <AccountsStack.Screen
        name="Auto Add Accounts"
        component={AutoAdd}
        options={getScreenOptions()}
      />
      <AccountsStack.Screen
        name="Verification"
        component={Verification}
        options={getScreenOptions()}
      />
      <AccountsStack.Screen
        name="Manually Add Accounts"
        component={ManualAdd}
        options={getScreenOptions()}
      />
      <AccountsStack.Screen
        options={{headerShown: false}}
        name="Load Accounts"
        component={ImportLoading}
      />
      <AccountsStack.Screen
        name="Settlement Negotiation"
        component={Negotiation}
        options={getScreenOptions()}
      />
      {renderScreen('PaymentSetup', PaymentSetup)}
      {renderScreen(
        'PaymentCalculator',

        PaymentCalculator,
      )}
      {renderScreen('PaymentSummary', PaymentSummary)}
      {renderScreen('PaymentConfirmation', PaymentConfirmation)}
      {renderScreen('BankLogin', BankLogin)}
      {renderScreen('BankSetup', BankSetup)}
      {renderScreen(
        'SchedulePayment',

        SchedulePayment,
      )}
    </AccountsStack.Navigator>
  );
}
