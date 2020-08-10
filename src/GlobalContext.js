import React, {useState, createContext} from 'react';
import {usePersistStorage} from 'react-native-use-persist-storage';

export const GlobalContext = createContext();

const createDefaultContext = () => ({
  loggedIn: false,
  notifications: {
    allowNotifications: true,
    newMessage: true,
    upcomingPayment: true,
    paymentComplete: true,
    paidInFull: true,
    bucksEarned: true,
    newOffer: true,
    offerAccepted: true,
  },
});

export const GlobalProvider = props => {
  const [globalData, setGlobalData] = usePersistStorage(
    'GlobalContext',
    createDefaultContext,
  );

  return (
    <GlobalContext.Provider value={[globalData, setGlobalData]}>
      {props.children}
    </GlobalContext.Provider>
  );
};
