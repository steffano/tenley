import React, {useContext, useState, useRef} from 'react';
import {SafeAreaView, Text, StyleSheet, View} from 'react-native';
import {Spacing, Typography} from '../../../utilities/styles';
import {Form, TextInput} from '../../../components/Form';
import {Button} from '../../../components/Button';
import {maskSSn, unmask} from '../../../utilities/validation';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {Auth} from 'aws-amplify';
import LocationSearch from '../../../components/LocationSearch';
import {GlobalContext} from '../../../GlobalContext';

const AutoAdd = ({navigation}) => {
  const [globalData, setGlobalData] = useContext(GlobalContext);
  const user = globalData.user;
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

  const handleSubmit = async () => {
    const u = await Auth.currentAuthenticatedUser();
    if (validateForm()) {
      try {
        await Auth.updateUserAttributes(u, {
          'custom:ssn': unmask(ssn),
          birthdate: date,
          address,
        })
          .then(res => {
            console.log('res', res);
          })
          .then(navigation.navigate('Verification'))
          .catch(err => {
            console.log(err);
          });
      } catch (err) {
        console.log(err);
      }
    }
  };

  console.log(user, 'llllllll');

  const validateForm = () => {
    // setFnValid(fn !== '');
    // setLnValid(ln !== '');
    // setSsnValid(ssn !== '');
    // setDateValid(date !== '');
    // setAddressValid(address !== '');
    return (
      fn !== '' && ln !== '' && ssn !== '' && date !== '' && address !== ''
    );
  };

  return (
    <>
      <SafeAreaView style={styles.container}>
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
          <View style={styles.bottomButtonsContainer}>
            <Button
              disabled={!validateForm()}
              title="Continue"
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
    marginVertical: 30,
    marginHorizontal: 25,
  },
  bottomButtonsContainer: {
    flex: 1,
    paddingHorizontal: 15,
    justifyContent: 'flex-end',
    maxHeight: 90,
    marginBottom: 15,
  },
});
