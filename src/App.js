import 'react-native-gesture-handler';
import React, {useEffect} from 'react';
import Navigation from './navigation';
import Amplify from 'aws-amplify';
// import Config from 'react-native-config';

import {GlobalProvider} from './GlobalContext';
import SplashScreen from 'react-native-splash-screen';

export default function App() {
  useEffect(() => {
    SplashScreen.hide();
  }, []);

  const config = {
    AWS_COGNITO_CLIENT_ID: '41cd7ejhvmvgeusle0olmfcs4l',
    AWS_COGNITO_USER_POOL: 'us-west-2_Rw5tnnUFI',
    AWS_COGNITO_REGION: 'us-west-2_Rw5tnnUFI',
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
      </GlobalProvider>
    </>
  );
}
