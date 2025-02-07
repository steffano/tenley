import 'react-native-gesture-handler';
import React, {useEffect} from 'react';
import Navigation from './navigation';

import {GlobalProvider} from './GlobalContext';
import {AuthProvider} from './contexts/AuthContext';
import {ProfileProvider} from './contexts/ProfileContext';
import {AccountsProvider} from './contexts/AccountsContext';
import SplashScreen from 'react-native-splash-screen';

export default function App() {
  useEffect(() => {
    SplashScreen.hide();
  }, []);

  console.disableYellowBox = true;

  return (
    <AuthProvider>
      <GlobalProvider>
        <ProfileProvider>
          <AccountsProvider>
            <Navigation />
          </AccountsProvider>
        </ProfileProvider>
      </GlobalProvider>
    </AuthProvider>
  );
}
