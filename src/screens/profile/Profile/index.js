import React, {useContext} from 'react';
import {SafeAreaView, View, Text} from 'react-native';
import {GlobalContext} from '../../../GlobalContext';
import {Header} from '../../../components/Header';
import {Button} from '../../../components/Button';

const Profile = ({navigation}) => {
  const [globalData, setGlobalData] = useContext(GlobalContext);

  return (
    <>
      <SafeAreaView style={{flex: 1}}>
        <Header header={'Profile'} />
        <View style={{paddingHorizontal: 15, paddingVertical: 20}}>
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
        </View>
      </SafeAreaView>
    </>
  );
};

export default Profile;
