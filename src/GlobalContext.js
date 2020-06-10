import React, {useState, createContext} from 'react';

export const GlobalContext = createContext();

export const GlobalProvider = props => {
  const [globalData, setGlobalData] = useState([]);

  return (
    <GlobalContext.Provider value={[globalData, setGlobalData]}>
      {props.children}
    </GlobalContext.Provider>
  );
};
