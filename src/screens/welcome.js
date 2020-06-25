import React, {useState} from 'react';
import {RFPercentage, RFValue} from 'react-native-responsive-fontsize';
import {
  View,
  Text,
  StyleSheet,
  Image,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';
import AppIntroSlider from 'react-native-app-intro-slider';
import {colors} from '../utilities/styles';
import {Button} from '../components/Button';

export default function Welcome({navigation}) {
  const [showSlides, setShowSlides] = useState(true);
  const [slideIndex, setSlideIndex] = useState(0);

  const slides = [
    {
      key: '1',
      text:
        'Let Tenley be your superhero and help \n you get out of debt fast!',
      image: require('../assets/mascot/tenley-mascot1.png'),
      backgroundColor: colors.white,
      styles: {marginRight: 20},
    },
    {
      key: '2',
      text:
        'With Tenley, you can maximize your \n payments, control how collectors \n contact you, and FLY to debt freedom!',
      image: require('../assets/mascot/tenley-mascot2.png'),
      backgroundColor: colors.white,
      styles: {marginLeft: 25},
    },
    {
      key: '3',
      text:
        'Tenley can even help you negotiate \n with collectors and lower your debt',
      image: require('../assets/mascot/tenley-mascot3.png'),
      backgroundColor: colors.white,
      styles: {marginLeft: RFPercentage(7)},
    },
  ];

  const renderSlide = ({item}) => {
    return (
      <View style={[styles.container, {backgroundColor: item.backgroundColor}]}>
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
          }}>
          <Image
            source={item.image}
            resizeMode="contain"
            style={[
              {
                width: '80%',
                maxHeight: '70%',
              },
              item.styles,
            ]}
          />
          <Text style={styles.text}>{item.text}</Text>
        </View>
      </View>
    );
  };
  const onDone = () => {
    navigation.navigate('Register');
  };

  const doneOnLastSwipe = e => {
    if (slideIndex === 2) {
      if (e.nativeEvent.contentOffset.x > 700) {
        onDone();
      }
    }
  };

  return !showSlides ? (
    <>
      <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
        <Button
          title="Go to Login"
          onPress={() => navigation.navigate('Login')}
        />
        <Button
          title="Go to storybook"
          onPress={() => navigation.navigate('Storybook')}
        />
        <Button title="Start slides" onPress={() => setShowSlides(true)} />
      </View>
    </>
  ) : (
    <>
      <SafeAreaView
        style={{
          flex: 1,
          height: '100%',
          justifyContent: 'center',
          backgroundColor: colors.white,
        }}>
        <Image
          source={require('../assets/logo/Transparent-1.png')}
          resizeMode="contain"
          style={{
            height: 41,
            width: 132,
            alignSelf: 'center',
            paddingBottom: 100,
          }}
        />
        <AppIntroSlider
          renderItem={renderSlide}
          data={slides}
          dotStyle={{backgroundColor: colors.lightGreen}}
          activeDotStyle={{backgroundColor: colors.mediumGreen}}
          dotClickEnabled
          showNextButton={false}
          showDoneButton={false}
          onSlideChange={index => setSlideIndex(index)}
          // onSlideChange={index => {
          //   index === 3 ? onDone() : null;
          // }}
          onScrollEndDrag={e => doneOnLastSwipe(e)}
        />
        <TouchableOpacity>
          <Text style={styles.skipButton} onPress={() => onDone()}>
            SKIP
          </Text>
        </TouchableOpacity>
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: 'center',
    // alignItems: 'center',
  },
  text: {
    fontSize: RFValue(14),
    fontFamily: 'Poppins-Regular',
    textAlign: 'center',
    color: colors.darkGreen,
    paddingVertical: RFValue(30),
    paddingHorizontal: RFValue(20),
    marginBottom: RFValue(25),
  },
  skipButton: {
    height: 23,
    width: 34,
    color: colors.darkGreen,
    fontFamily: 'Poppins-Regular',
    fontSize: RFValue(12),
    letterSpacing: 1.46,
    textDecorationLine: 'underline',
    position: 'absolute',
    bottom: RFValue(22),
    right: RFValue(20),
  },
});
