import React, {useContext} from 'react';
import {Image} from 'react-native';
import Welcome from './screens/welcome';
import Login from './screens/Login';
import Register from './screens/Register';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {GlobalContext} from './GlobalContext';
import {colors} from './utilities/styles';
import AccountsScreen from './screens/accounts';
import ProfileScreen from './screens/profile';
import StoryBook from '../storybook';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const iconStyle = {height: 20, width: 20};

function Navigation() {
  const [globalData] = useContext(GlobalContext);

  return (
    <NavigationContainer>
      {!globalData.loggedIn ? (
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
          }}>
          <Stack.Screen name="Welcome" component={Welcome} />
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="Register" component={Register} />
          <Stack.Screen name="Storybook" component={StoryBook} />
        </Stack.Navigator>
      ) : (
        <Tab.Navigator
          screenOptions={{
            tabBarStyle: {
              backgroundColor: colors.white,
              borderTopColor: colors.lightGrey,
              height: 85,
              paddingBottom: 20,
              paddingTop: 10,
            },
            tabBarLabelStyle: {
              fontSize: 12,
            },
            headerShown: false,
          }}>
          <Tab.Screen
            name="Accounts"
            component={AccountsScreen}
            options={{
              tabBarIcon: ({focused}) => (
                <Image
                  style={iconStyle}
                  source={
                    focused
                      ? require('./assets/images/accounts-active.png')
                      : require('./assets/images/accounts.png')
                  }
                />
              ),
            }}
          />
          <Tab.Screen
            name="Profile"
            component={ProfileScreen}
            options={{
              tabBarIcon: ({focused}) => (
                <Image
                  style={iconStyle}
                  source={
                    focused
                      ? require('./assets/images/profile-active.png')
                      : require('./assets/images/profile.png')
                  }
                />
              ),
            }}
          />
        </Tab.Navigator>
      )}
    </NavigationContainer>
  );
}

export default Navigation;
