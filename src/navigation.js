import React, {useContext} from 'react';
import Welcome from './screens/welcome';
import Home from './screens/home';
import Details from './screens/details';
import Login from './screens/login';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {GlobalContext} from './GlobalContext';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

function Navigation() {
  const [globalData] = useContext(GlobalContext);

  return (
    <>
      <NavigationContainer>
        {!globalData.loggedIn ? (
          <Stack.Navigator initialRouteName="Welcome">
            <Stack.Screen name="Welcome" component={Welcome} />
            <Stack.Screen name="Login" component={Login} />
          </Stack.Navigator>
        ) : (
          <Tab.Navigator>
            <Tab.Screen name="Home" component={Home} />
            <Tab.Screen name="Settings" component={Details} />
          </Tab.Navigator>
        )}
      </NavigationContainer>
    </>
  );
}

export default Navigation;
