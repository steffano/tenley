import React, {useContext} from 'react';
import {View, Text, Button} from 'react-native';
import {GlobalContext} from '../GlobalContext';

const Login = () => {
  const [, setGlobalData] = useContext(GlobalContext);

  return (
    <>
      <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
        <Text>Login</Text>
        <Button title="Login" onPress={() => setGlobalData({loggedIn: true})} />
      </View>
    </>
  );
};

export default Login;
