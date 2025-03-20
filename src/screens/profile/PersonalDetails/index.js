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
  
  console.log('User data in PersonalDetails:', user);
  
  // Add defensive checks for all user fields
  const [fn, setFn] = useState(user?.given_name || '');
  const [ln, setLn] = useState(user?.family_name || '');
  const [email, setEmail] = useState(user?.email || '');
  
  // Safely handle phone number formatting
  const [phone, setPhone] = useState(() => {
    if (!user?.phone_number) return '';
    // Check if phone number starts with +1 before slicing
    return user.phone_number.startsWith('+1') 
      ? maskPhone(user.phone_number.slice(2)) 
      : maskPhone(user.phone_number);
  });
  const [fnValid, setFnValid] = useState(true);
  const [lnValid, setLnValid] = useState(true);
  const [emailValid, setEmailValid] = useState(true);
  const [phoneValid, setPhoneValid] = useState(true);

  const [faceId, setFaceId] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleComplete = async () => {
    if (validateForm()) {
      setLoading(true);
      
      // Update local state first for immediate UI feedback
      const updatedUser = {
        ...user,
        given_name: fn,
        family_name: ln,
        phone_number: '+1' + unmask(phone),
      };
      
      setGlobalData({
        ...globalData,
        user: updatedUser,
      });
      
      // Use your Rails API instead of Amplify
      try {
        // Try different IP configurations based on platform
        const baseUrls = [
          'http://10.0.2.2:3000',    // Android emulator
          'http://localhost:3000',   // iOS simulator
          'http://127.0.0.1:3000'    // Alternative localhost
        ];
        
        let response = null;
        let fetchError = null;
        
        // Try each base URL until one works
        for (const baseUrl of baseUrls) {
          try {
            console.log(`Trying to update profile at: ${baseUrl}/api/v1/profile`);
            
            response = await fetch(`${baseUrl}/api/v1/profile`, {
              method: 'PUT',
              headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${globalData.token}`,
                'Accept': 'application/json'
              },
              body: JSON.stringify({
                profile: {
                  given_name: fn,
                  family_name: ln,
                  phone_number: '+1' + unmask(phone),
                }
              })
            });
            
            console.log(`Response from ${baseUrl}: ${response.status}`);
            
            if (response) {
              break; // Found a working URL, exit the loop
            }
          } catch (error) {
            console.log(`Error with ${baseUrl}: ${error.message}`);
            fetchError = error;
            // Continue to try the next URL
          }
        }
        
        if (!response) {
          throw fetchError || new Error('Failed to update profile on any endpoint');
        }
        
        const rawText = await response.text();
        console.log('Raw response:', rawText);
        
        // Only try to parse as JSON if it looks like JSON
        let data;
        if (rawText.trim().startsWith('{')) {
          data = JSON.parse(rawText);
          console.log('Profile update response:', data);
        } else {
          console.error('Server returned non-JSON response');
          setErrorMessage('Server returned invalid response format');
          setLoading(false);
          return;
        }
        
        if (response.ok) {
          navigation.reset({
            index: 3,
            routes: [{name: 'Profile'}],
          });
        } else {
          setErrorMessage((data && data.errors) || 'Failed to update profile');
        }
      } catch (error) {
        console.error('Error updating profile:', error);
        setErrorMessage('Network error. Please try again.');
      } finally {
        setLoading(false);
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
