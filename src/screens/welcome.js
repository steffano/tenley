import React from 'react';
import {View, Text, Button} from 'react-native';

export default function Welcome({navigation}) {
  return (
    <>
      <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
        <Text>Welcome</Text>
        <Button
          title="Go to Login"
          onPress={() => navigation.navigate('Login')}
        />
      </View>
    </>
  );
}
