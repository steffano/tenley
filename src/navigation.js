import React, {useContext} from 'react';
import {Image, View} from 'react-native';
import Welcome from './screens/welcome';
import Login from './screens/Login';
import Register from './screens/Register';
import Verify from './screens/Register/verify.js';
import FaceId from './screens/Register/face-id.js';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {GlobalContext} from './GlobalContext';
import {colors} from './utilities/styles';
import {RFPercentage} from 'react-native-responsive-fontsize';
import {AccountsStackScreen} from './screens/accounts/AccountsStack';
import {ActivityStackScreen} from './screens/activity/ActivityStack';
import {ProfileStackScreen} from './screens/profile/ProfileStack';
import {MessageStackScreen} from './screens/messages/MessagesStack';
// import StoryBook from '../storybook';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

function Navigation() {
  const [globalData] = useContext(GlobalContext);

  return (
    <>
      <NavigationContainer>
        {!globalData.loggedIn ? (
          <Stack.Navigator
            initialRouteName="Welcome"
            screenOptions={{
              headerShown: false,
            }}>
            <Stack.Screen name="Welcome" component={Welcome} />
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="Register" component={Register} />
            <Stack.Screen name="Verify" component={Verify} />
            <Stack.Screen name="FaceId" component={FaceId} />
            {/* <Stack.Screen name="Storybook" component={StoryBook} /> */}
          </Stack.Navigator>
        ) : (
          <Tab.Navigator
            tabBarOptions={{
              safeAreaInset: true,
              showIcon: true,
              activeTintColor: colors.tenleyGreen,
              inactiveTintColor: colors.darkGreen,
              labelStyle: {
                fontFamily: 'Poppins-Regular',
                letterSpacing: 1,
                flex: 1,
                alignItems: 'center',
                justifyContent: 'center',
                paddingTop: 10,
              },
              style: {
                height: RFPercentage(12),
                paddingVertical: 15,
                shadowColor: colors.mediumGray,
                shadowOpacity: 0.8,
                shadowRadius: 3,
                shadowOffset: {
                  height: 1,
                  width: 1,
                },
              },
              tabStyle: {
                // maxHeight: 100,
              },
            }}>
            <Tab.Screen
              name="Accounts"
              component={AccountsStackScreen}
              options={{
                tabBarIcon: ({focused}) => (
                  <View>
                    <Image
                      source={
                        focused
                          ? require('./assets/icons/menu/home/fill.png')
                          : require('./assets/icons/menu/home/line.png')
                      }
                    />
                  </View>
                ),
              }}
            />
            <Tab.Screen
              name="Activity"
              component={ActivityStackScreen}
              options={{
                tabBarIcon: ({focused}) => (
                  <Image
                    source={
                      focused
                        ? require('./assets/icons/menu/activity/fill.png')
                        : require('./assets/icons/menu/activity/line.png')
                    }
                  />
                ),
              }}
            />
            <Tab.Screen
              name="Messages"
              component={MessageStackScreen}
              options={{
                tabBarIcon: ({focused}) => (
                  <Image
                    source={
                      focused
                        ? require('./assets/icons/menu/messages/fill.png')
                        : require('./assets/icons/menu/messages/line.png')
                    }
                  />
                ),
              }}
            />
            <Tab.Screen
              name="Profile"
              component={ProfileStackScreen}
              options={{
                tabBarIcon: ({focused}) => (
                  <Image
                    source={
                      focused
                        ? require('./assets/icons/menu/profile/fill.png')
                        : require('./assets/icons/menu/profile/line.png')
                    }
                  />
                ),
              }}
            />
          </Tab.Navigator>
        )}
      </NavigationContainer>
    </>
  );
}

export default Navigation;
