import 'react-native-gesture-handler';
import React, {useEffect} from 'react';
import Navigation from './navigation';
import {GlobalProvider} from './GlobalContext';
import SplashScreen from 'react-native-splash-screen';

export default function App() {
  useEffect(() => {
    SplashScreen.hide();
  }, []);
  return (
    <>
      <GlobalProvider>
        <Navigation />
      </GlobalProvider>
    </>
  );
}
