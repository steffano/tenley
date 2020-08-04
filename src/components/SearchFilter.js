import React from 'react';
import {
  TouchableOpacity,
  View,
  Text,
  StyleSheet,
  Image,
  TextInput,
} from 'react-native';
import {colors} from '../utilities/styles';
import {RFPercentage, RFValue} from 'react-native-responsive-fontsize';

import PropTypes from 'prop-types';
import {white} from '../utilities/colors';

export const SearchFilter = ({searchOnly}) => {
  return (
    <View style={styles.row}>
      <View style={[styles.searchBox, {width: searchOnly ? '100%' : '85%'}]}>
        <View style={styles.row}>
          <Image
            style={{
              width: RFValue(15),
              height: RFValue(15),
            }}
            source={require('../assets/icons/search.png')}
          />
          <TextInput
            selectionColor={colors.tenleyGreen}
            returnKeyType="done"
            style={styles.text}
          />
        </View>
      </View>

      {!searchOnly && (
        <TouchableOpacity>
          <View style={styles.filterButton}>
            <View style={[styles.filterLine, {width: 18}]} />
            <View style={[styles.filterLine, {width: 12}]} />
            <View style={[styles.filterLine, {width: 6}]} />
          </View>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  searchBox: {
    height: RFValue(40),
    borderWidth: 1,
    borderRadius: 5,
    borderColor: colors.lightGray,
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  filterButton: {
    height: RFValue(40),
    width: RFValue(40),
    borderRadius: 5,
    backgroundColor: colors.mediumGreen,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 15,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 15,
    marginVertical: RFValue(10),
  },
  filterLine: {
    backgroundColor: 'white',
    height: 3,
    width: 10,
    borderRadius: 3,
    margin: 2,
  },
  text: {
    // backgroundColor: 'red',
    fontFamily: 'Poppins-Regular',
    color: colors.darkGreen,
    fontSize: RFValue(14),
    letterSpacing: 0.9,
    marginLeft: 15,
    width: '90%',
    height: '90%',
  },
});

SearchFilter.propTypes = {
  hideFilter: PropTypes.bool,
};

SearchFilter.defaultProps = {
  hideFilter: false,
};
