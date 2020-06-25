// import React, {useContext} from 'react';
// import {View, Text, Button} from 'react-native';
// import {GlobalContext} from '../../GlobalContext';

// const Accounts = () => {
//   const [globalData, setGlobalData] = useContext(GlobalContext);

//   Keychain.getGenericPassword().then(res => {
//     console.log('#######', res);
//   });

//   return (
//     <>
//       <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
//         <Text style={{fontFamily: 'VisbyCF-Medium'}}>Accounts</Text>
//       </View>
//     </>
//   );
// };

// export default Accounts;

import React from 'react';
import {TouchableOpacity, Image} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import Accounts from '../Accounts';
import AccountDetails from '../AccountDetails';
import Negotiation from '../Negotiation';

const AccountsStack = createStackNavigator();

const getScreenOptions = () => {
  return {
    headerStyle: {
      backgroundColor: 'transparent',
    },
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
      <AccountsStack.Screen name="Negotiation" component={Negotiation} />
    </AccountsStack.Navigator>
  );
}
