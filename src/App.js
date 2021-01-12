import 'react-native-gesture-handler';
import React, {useEffect} from 'react';
import {View, Text} from 'react-native';
import Navigation from './navigation';
import Amplify from 'aws-amplify';
// import Config from 'react-native-config';

import {GlobalProvider} from './GlobalContext';
import SplashScreen from 'react-native-splash-screen';

export default function App() {
  useEffect(() => {
    SplashScreen.hide();
  }, []);

  console.disableYellowBox = true;

  const config = {
    AWS_COGNITO_CLIENT_ID: 'hl07clre26rq0jfmr69tjpq4i',
    AWS_COGNITO_USER_POOL: 'us-west-2_J0YuuaHOF',
    AWS_COGNITO_REGION: 'us-west-2_J0YuuaHOF',
  };

  Amplify.configure({
    Auth: {
      mandatorySignIn: true,
      region: config.AWS_COGNITO_REGION,
      userPoolId: config.AWS_COGNITO_USER_POOL,
      userPoolWebClientId: config.AWS_COGNITO_CLIENT_ID,
    },
  });

  return (
    <>
      <GlobalProvider>
        <Navigation />
        {/* <View>
          <Text>test</Text>
        </View> */}
      </GlobalProvider>
    </>
  );
}
