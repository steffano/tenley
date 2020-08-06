import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import Profile from '../Profile';
import {getScreenOptions} from '../../../utilities/styles';
import PersonalDetails from '../PersonalDetails';
import ChangePassword from '../ChangePassword';
import Agreements from '../Agreements';
import NotificationSettings from '../NotificationSettings';
import AskTenley from '../AskTenley';

const ProfileStack = createStackNavigator();

export function ProfileStackScreen() {
  return (
    <ProfileStack.Navigator>
      <ProfileStack.Screen
        options={{headerShown: false}}
        name="Profile Home"
        component={Profile}
      />
      <ProfileStack.Screen
        name="Personal"
        component={PersonalDetails}
        options={{headerShown: false}}
      />
      <ProfileStack.Screen
        name="Agreements"
        component={Agreements}
        options={{headerShown: false}}
      />
      <ProfileStack.Screen
        name="Notification Settings"
        component={NotificationSettings}
        options={{headerShown: false}}
      />
      <ProfileStack.Screen
        name="Ask Tenley"
        component={AskTenley}
        options={{headerShown: false}}
      />
      <ProfileStack.Screen
        name="Change Password"
        component={ChangePassword}
        options={{headerShown: false}}
      />
    </ProfileStack.Navigator>
  );
}
