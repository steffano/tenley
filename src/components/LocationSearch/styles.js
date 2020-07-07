import {StyleSheet} from 'react-native';
import {RFPercentage, RFValue} from 'react-native-responsive-fontsize';
import {colors} from '../../utilities/styles';

// import {Colors, Fonts} from '../../styles';

const styles = StyleSheet.create({
  textInputContainer: {
    backgroundColor: 'transparent',
    height: null,
    borderTopColor: 'transparent',
    borderBottomColor: 'transparent',
    borderTopWidth: 0,
    borderBottomWidth: 0,
  },
  textInput: {
    paddingRight: 5,
    paddingLeft: 5,
    height: 60,
    flex: 4,
    borderWidth: 0,
    borderBottomColor: 'transparent',
    marginTop: 0,
    marginLeft: 10,
    fontSize: RFValue(12),
    fontFamily: 'Poppins-Medium',
    color: colors.darkGreen,
    letterSpacing: 1.75,
    marginHorizontal: 15,
  },

  description: {
    fontWeight: 'bold',
  },
  separator: {
    display: 'none',
  },
  predefinedPlacesDescription: {
    color: '#1faadb',
  },
  poweredContainer: {
    display: 'none',
  },
});

export default styles;
