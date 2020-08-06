import React, {useContext, useState, useRef} from 'react';
import {SafeAreaView, Text, StyleSheet, View} from 'react-native';
import {Spacing, Typography} from '../../../utilities/styles';
import {Form, TextInput} from '../../../components/Form';
import {Button} from '../../../components/Button';
import {ScreenHeader} from '../../../components/ScreenHeader';
import {maskSSn, unmask} from '../../../utilities/validation';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {Auth} from 'aws-amplify';
import {RFValue} from 'react-native-responsive-fontsize';
import LocationSearch from '../../../components/LocationSearch';
import {GlobalContext} from '../../../GlobalContext';
import apis from '../../../apis/';

const AutoAdd = ({navigation}) => {
  const [globalData, setGlobalData] = useContext(GlobalContext);
  const {user, session} = globalData;
  const [fn, setFn] = useState(user.given_name);
  const [ln, setLn] = useState(user.family_name);
  const [ssn, setSsn] = useState('');
  const [date, setDate] = useState('');
  const [address, setAddress] = useState('');

  const [fnValid, setFnValid] = useState(true);
  const [lnValid, setLnValid] = useState(true);
  const [ssnValid, setSsnValid] = useState(true);
  const [dateValid, setDateValid] = useState(true);
  const [addressValid, setAddressValid] = useState(true);

  const [placeLat, setPlaceLat] = useState();
  const [placeLon, setPlaceLon] = useState();
  const [placeName, setPlaceName] = useState('');
  const [placeGooglePlaceId, setPlaceGooglePlaceId] = useState('');

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const jwt = session.accessToken.jwtToken;

  const handleSubmit = async () => {
    if (validateForm()) {
      setIsLoading(true);
      setError('');
      updateUser();
      try {
        await apis
          .importAccounts(jwt)
          .then(res => {
            console.log('res', res);
          })
          .then(navigation.navigate('Verification'));
      } catch (error) {
        console.log(error.message);
        setError(
          'An error occurred, please check your information and try again',
        );
      }
    }
    setIsLoading(false);
  };

  const updateUser = async () => {
    const u = await Auth.currentAuthenticatedUser();
    try {
      await Auth.updateUserAttributes(u, {
        'custom:ssn': unmask(ssn),
        birthdate: date,
        address,
      });
    } catch (err) {
      console.log(err);
    }
  };

  console.log(jwt);

  const validateForm = () => {
    return (
      fn !== '' && ln !== '' && ssn !== '' && date !== '' && address !== ''
    );
  };

  return (
    <>
      <SafeAreaView style={styles.container}>
        <ScreenHeader title={'Auto Add Accounts'} navigation={navigation} />
        <KeyboardAwareScrollView
          keyboardShouldPersistTaps="always"
          contentInsetAdjustmentBehavior="automatic"
          contentContainerStyle={{
            flexGrow: 1,
          }}>
          <Text style={styles.blockText}>
            Let’s add some of your details to get started. Don’t worry, this
            information is only used to verify your accounts.
          </Text>
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
              label="Social Security Number"
              keyboardType="numeric"
              onChangeText={text => {
                setSsn(maskSSn(text));
                setSsnValid(true);
              }}
              value={ssn}
              highlightOnFocus
              invalid={!ssnValid}
              message={'Please enter your social security number'}
            />
            <TextInput
              datePicker
              setDateValue={value => setDate(value)}
              onPress={text => {
                setDate(text);
                setDateValid(true);
              }}
              label="Date of Birth"
              value={date}
              highlightOnFocus
              invalid={!dateValid}
              message={'Please enter your birthdate'}
            />

            <TextInput
              keyboardShouldPersistTaps="always"
              hasChildren
              label="Address"
              value={address}
              onChangeText={text => {
                setAddress(text);
                setAddressValid(true);
              }}
              highlightOnFocus
              invalid={!addressValid}
              message={'Please enter your address'}>
              <LocationSearch
                onChangeLocation={(location, details) => {
                  console.log(details);
                  console.log(location);
                  const {
                    geometry: {
                      location: {lat, lng},
                    },
                    formatted_address,
                    place_id,
                    name,
                  } = details;
                  setAddress(formatted_address);
                  setPlaceName(name);
                  setPlaceLat(lat);
                  setPlaceLon(lng);
                  setPlaceGooglePlaceId(place_id);
                }}
                value={address}
              />
            </TextInput>
          </Form>
          <View style={Spacing.bottomButtonsContainer}>
            <Button
              loading={isLoading}
              disabled={!validateForm()}
              title="Complete Auto Add"
              onPress={() => handleSubmit()}
            />
          </View>
        </KeyboardAwareScrollView>
      </SafeAreaView>
    </>
  );
};

export default AutoAdd;

const styles = StyleSheet.create({
  container: {
    ...Spacing.defaultContainer,
  },
  blockText: {
    ...Typography.subheaderText,
    textAlign: 'left',
    marginVertical: RFValue(20),
    marginHorizontal: RFValue(25),
  },
  bottomButtonsContainer: {
    flex: 1,
    paddingHorizontal: RFValue(15),
    justifyContent: 'flex-end',
    maxHeight: RFValue(90),
    marginBottom: RFValue(15),
  },
});
