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
import {colors, Typography, Spacing} from '../utilities/styles';
import {tenleyGreen} from '../utilities/colors';
import currency from 'currency.js';

export default function Welcome({navigation}) {
  const [slideIndex, setSlideIndex] = useState(0);

  const slides = [
    {
      key: '1',
      text: 'Let Tenley’s superpowers help you \n get out of debt fast!',
      image: require('../assets/mascot/tenley-mascot1.png'),
      backgroundColor: colors.white,
      styles: {marginRight: 20},
    },
    {
      key: '2',
      text:
        'With Tenley you can get rewards, maximize your payments, control how creditors and debt collectors contact you, and ',
      text2: 'FLY ',
      text3: 'towards debt freedom!',
      image: require('../assets/mascot/tenley-mascot2.png'),
      backgroundColor: colors.white,
      styles: {marginLeft: 25},
    },
    {
      key: '3',
      text:
        'Tenley can even help you negotiate \n and lower your debts, all through the \n easy to use app',
      image: require('../assets/mascot/tenley-mascot3.png'),
      backgroundColor: colors.white,
      styles: {marginLeft: RFPercentage(7)},
    },
  ];

  const renderSlide = ({item}) => {
    return (
      <View style={[styles.container, {backgroundColor: item.backgroundColor}]}>
        <View style={styles.container}>
          <Image
            source={item.image}
            resizeMode="contain"
            style={[styles.tenleyImage, item.styles]}
          />
          <Text style={styles.text}>
            {item.text}
            <Text
              style={{
                color: colors.mediumGreen,
                fontFamily: 'Poppins-Bold',
              }}>
              {item.text2}
            </Text>
            <Text>{item.text3}</Text>
          </Text>
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

  // const val = currency('$20920.23');
  // const USD = value => currency(value, {symbol: '$', precision: 2}).format();

  // // "$1,234.56"
  // console.log(val.value, USD(1234.56));

  // const nf = 10101;

  return (
    <>
      <SafeAreaView style={styles.container}>
        <Image
          source={require('../assets/logo/Transparent-1.png')}
          resizeMode="contain"
          style={styles.logoImage}
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
            {slideIndex === 2 ? 'CONTINUE' : 'SKIP'}
          </Text>
        </TouchableOpacity>
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    ...Spacing.defaultContainer,
  },
  text: {
    ...Typography.bodyText,
    fontSize: RFValue(14),
    textAlign: 'center',
    padding: Spacing.large,
    marginBottom: Spacing.extraLarge,
  },
  skipButton: {
    color: colors.darkGreen,
    fontFamily: 'Poppins-Regular',
    fontSize: RFValue(12),
    letterSpacing: 1.46,
    textDecorationLine: 'underline',
    position: 'absolute',
    bottom: RFValue(22),
    right: RFValue(20),
  },
  tenleyImage: {
    flex: 1,
    maxHeight: '70%',
    maxWidth: '80%',
    marginBottom: Spacing.large,
  },
  logoImage: {
    flex: 2,
    maxHeight: 40,
    maxWidth: 130,
    alignSelf: 'center',
    margin: Spacing.large,
  },
});
