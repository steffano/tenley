import React, {useContext} from 'react';
import {View, Text, SafeAreaView} from 'react-native';
import {Button} from '../../components/Button';
import {GlobalContext} from '../../GlobalContext';

const FaceId = () => {
  const [globalData, setGlobalData] = useContext(GlobalContext);

  return (
    <>
      <SafeAreaView style={{marginHorizontal: 20, flex: 1}}>
        <Text style={{fontFamily: 'VisbyCF-Medium'}}>
          FaceId {globalData.testText}
        </Text>
        <View
          style={{
            position: 'absolute',
            bottom: 10,
            width: '100%',
            alignSelf: 'center',
          }}>
          <Button
            title="Enable Face ID"
            onPress={() => setGlobalData({loggedIn: true})}
          />
          <Button
            textOnly
            title="SKIP"
            onPress={() => setGlobalData({loggedIn: true})}
          />
        </View>
      </SafeAreaView>
    </>
  );
};

export default FaceId;
