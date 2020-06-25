import React, {useContext} from 'react';
import {SafeAreaView, Text, Button} from 'react-native';
import {GlobalContext} from '../../../GlobalContext';
import {Header} from '../../../components/Header';

const Profile = ({navigation}) => {
  const [globalData, setGlobalData] = useContext(GlobalContext);

  return (
    <>
      <SafeAreaView style={{flex: 1}}>
        <Header header={'Profile'} />
        <Button
          title="Personal"
          onPress={() => navigation.navigate('Personal')}
        />
        <Button
          title="Agreements"
          onPress={() => navigation.navigate('Agreements')}
        />
        <Button
          title="Notification Settings"
          onPress={() => navigation.navigate('Notification Settings')}
        />
        <Button
          title="Ask Tenley"
          onPress={() => navigation.navigate('Ask Tenley')}
        />
        <Button
          title="Log Out"
          onPress={() => setGlobalData({loggedIn: false})}
        />
      </SafeAreaView>
    </>
  );
};

export default Profile;
