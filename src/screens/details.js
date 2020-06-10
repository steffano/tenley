import React, {useContext, useState} from 'react';
import {View, Text, Button, TextInput} from 'react-native';
import {GlobalContext} from '../GlobalContext';
import {colors} from '../utilities/styles';

const Details = () => {
  const [globalData, setGlobalData] = useContext(GlobalContext);
  const [testText, setTestText] = useState('');

  return (
    <>
      <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
        <Text>Details</Text>

        <Button
          title="LOG OUT"
          onPress={() => setGlobalData({loggedIn: false})}
        />
        <View>
          <TextInput
            style={{backgroundColor: colors.lightGreen}}
            value={globalData.name}
            onChangeText={text => setTestText(text)}
          />
          <Button
            title="Add Text"
            onPress={() => setGlobalData({...globalData, testText})}
          />
        </View>
      </View>
    </>
  );
};

export default Details;
