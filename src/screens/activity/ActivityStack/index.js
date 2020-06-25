// import React, {useContext} from 'react';
// import {View, Text, Button} from 'react-native';
// import {GlobalContext} from '../../GlobalContext';
// import * as Keychain from 'react-native-keychain';

// const Activity = () => {
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
import Activity from '../Activity';
import PaymentsLog from '../PaymentsLog';
import {Image} from 'react-native';
import {getScreenOptions} from '../../../utilities/styles';

const ActivityStack = createStackNavigator();

// const getScreenOptions = () => {
//   return {
//     headerStyle: {
//       backgroundColor: 'transparent',
//     },
//     headerBackTitleVisible: false,
//     headerBackImage: () => (
//       <Image
//         source={require('../../../assets/icons/back-arrow.png')}
//         style={{marginLeft: 20}}
//       />
//     ),
//     headerTitleStyle: {
//       fontFamily: 'Poppins-Bold',
//       letterSpacing: 0.75,
//       fontSize: 16,
//       lineHeight: 26,
//     },
//   };
// };

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
    </ActivityStack.Navigator>
  );
}
