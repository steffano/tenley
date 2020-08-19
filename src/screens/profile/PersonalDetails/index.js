import React, {useState, useContext} from 'react';
import {
  SafeAreaView,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  View,
  Switch,
} from 'react-native';
import {GlobalContext} from '../../../GlobalContext';
import {Form, TextInput} from '../../../components/Form';
import {Button} from '../../../components/Button';
import {ScreenHeader} from '../../../components/ScreenHeader';
import {colors, Spacing} from '../../../utilities/styles';
import {Auth} from 'aws-amplify';
import {maskPhone, unmask, phoneRegex} from '../../../utilities/validation';
import apis from '../../../apis/';
import {RFValue, RFPercentage} from 'react-native-responsive-fontsize';

const Personal = ({navigation}) => {
  const [globalData, setGlobalData] = useContext(GlobalContext);
  const {user} = globalData;
  const [fn, setFn] = useState(user.given_name);
  const [ln, setLn] = useState(user.family_name);
  const [email, setEmail] = useState(user.email);
  const [phone, setPhone] = useState(maskPhone(user.phone_number.slice(2)));

  const [fnValid, setFnValid] = useState(true);
  const [lnValid, setLnValid] = useState(true);
  const [emailValid, setEmailValid] = useState(true);
  const [phoneValid, setPhoneValid] = useState(true);

  const [faceId, setFaceId] = useState(false);

  const handleComplete = async () => {
    if (validateForm()) {
      setGlobalData({
        ...globalData,
        user: {
          ...user,
          given_name: fn,
          family_name: ln,
          phone_number: '+1' + unmask(phone),
        },
      });
      const u = await Auth.currentAuthenticatedUser();
      try {
        await Auth.updateUserAttributes(u, {
          given_name: fn,
          family_name: ln,
          phone_number: '+1' + unmask(phone),
        }).then(
          navigation.reset({
            index: 3,
            routes: [{name: 'Profile'}],
          }),
        );
      } catch (err) {
        console.log(err);
      }
    }
  };

  console.log(phone, unmask(phone), '+1' + unmask(phone));

  const validateForm = () => {
    setFnValid(fn !== '');
    setLnValid(ln !== '');
    setPhoneValid(phoneRegex.test(unmask(phone)));
    return fn !== '' && ln !== '' && phoneRegex.test(unmask(phone));
  };

  return (
    <>
      <SafeAreaView style={styles.container}>
        <ScreenHeader title={'Account'} navigation={navigation} />
        <View style={{height: RFValue(15)}} />
        <Form>
          <TextInput
            label="Legal First Name"
            onChangeText={text => {
              setFn(text);
              setFnValid(true);
            }}
            value={fn}
            highlightOnFocus
            invalid={!fnValid}
            message={'Please enter your first name'}
          />
          <TextInput
            label="Legal Last Name"
            onChangeText={text => {
              setLn(text);
              setLnValid(true);
            }}
            value={ln}
            highlightOnFocus
            invalid={!lnValid}
            message={'Please enter your last name'}
          />
          <TextInput
            label="Email Address"
            value={email}
            highlightOnFocus
            invalid={!emailValid}
            message={'Please enter your email'}
            editable={false}
            removeBorder
          />
          <TextInput
            onChangeText={text => {
              setPhone(maskPhone(text));
              setPhoneValid(true);
            }}
            label="Phone Number"
            value={phone}
            highlightOnFocus
            invalid={!phoneValid}
            message={'Please enter a valid phone number'}
          />
        </Form>

        <View style={Spacing.bottomButtonsContainer}>
          <View style={[styles.row, {marginHorizontal: RFValue(10)}]}>
            <Text style={styles.rowText}>Enable Face ID</Text>
            <Switch value={faceId} onChange={() => setFaceId(!faceId)} />
          </View>
          <Button title="Save Changes" onPress={() => handleComplete()} />
        </View>
      </SafeAreaView>
    </>
  );
};

export default Personal;

const styles = StyleSheet.create({
  container: {
    ...Spacing.defaultContainer,
    justifyContent: 'flex-start',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: RFValue(10),
  },
  button: {
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: colors.lightGray,
    borderRadius: 5,
    alignContent: 'center',
    marginVertical: RFValue(5),
    minHeight: RFValue(55),
    padding: RFValue(15),
  },
  rowText: {
    fontFamily: 'Poppins-Regular',
    color: colors.darkGreen,
    fontSize: RFValue(12),
    letterSpacing: 0.8,
    alignSelf: 'center',
    textAlign: 'center',
  },
});
