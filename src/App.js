import 'react-native-gesture-handler';
import React, {useEffect} from 'react';
import {View, Text} from 'react-native';
import Navigation from './navigation';

import {GlobalProvider} from './GlobalContext';
import {AuthProvider} from './contexts/AuthContext';
import SplashScreen from 'react-native-splash-screen';

export default function App() {
  useEffect(() => {
    SplashScreen.hide();
  }, []);

  console.disableYellowBox = true;

  return (
    <>
      <AuthProvider>
        <GlobalProvider>
          <Navigation />
        </GlobalProvider>
      </AuthProvider>
    </>
  );
}
