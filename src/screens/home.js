import React, {useContext} from 'react';
import {View, Text, Button} from 'react-native';
import {GlobalContext} from '../GlobalContext';

const Home = () => {
  const [globalData, setGlobalData] = useContext(GlobalContext);

  return (
    <>
      <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
        <Text style={{fontFamily: 'VisbyCF-Medium'}}>
          Home {globalData.testText}{' '}
        </Text>
      </View>
    </>
  );
};

export default Home;
