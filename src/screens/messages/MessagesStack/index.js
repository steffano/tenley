// import React, {useContext} from 'react';
// import {View, Text, Button} from 'react-native';
// import {GlobalContext} from '../../GlobalContext';

// const Messages = () => {
//   const [globalData, setGlobalData] = useContext(GlobalContext);

//   Keychain.getGenericPassword().then(res => {
//     console.log('#######', res);
//   });

//   return (
//     <>
//       <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
//         <Text style={{fontFamily: 'VisbyCF-Medium'}}>Activity</Text>
//       </View>
//     </>
//   );
// };

// export default Activity;

import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import Message from '../Messages';
import Inbox from '../Inbox';
import MessageDetails from '../MessageDetails';
import {getScreenOptions} from '../../../utilities/styles';
import AccountsStack from '../../accounts/AccountsStack';

const MessagesStack = createStackNavigator();

export function MessageStackScreen() {
  return (
    <MessagesStack.Navigator>
      <MessagesStack.Screen
        options={{headerShown: false}}
        // options={getScreenOptions()}
        name="Messages Home"
        component={Message}
      />
      <MessagesStack.Screen
        options={{headerShown: false}}
        // options={getScreenOptions()}
        name="Inbox"
        component={Inbox}
      />
      <MessagesStack.Screen
        options={{headerShown: false}}
        // options={getScreenOptions()}
        name="Details"
        component={MessageDetails}
      />
    </MessagesStack.Navigator>
  );
}
