import React, {useState} from 'react';
import {TouchableOpacity, Text, StyleSheet, View} from 'react-native';
import {colors} from '../utilities/styles';
import {RFPercentage, RFValue} from 'react-native-responsive-fontsize';

import PropTypes from 'prop-types';

export const Header = ({header, section1, section2, section, onPress}) => {
  //   const [section, setSection] = useState(1);
  return (
    <View style={styles.headerBar}>
      <Text style={styles.title}>{header}</Text>

      <View
        style={{
          flex: 1,
          flexDirection: 'row',
          justifyContent: 'flex-end',
        }}>
        {/* <TouchableOpacity
          style={[
            styles.headerToggle,
            {
              borderBottomColor:
                section === 1 ? colors.tenleyGreen : 'transparent',
            },
          ]}
          onPress={onPress}>
          <Text style={styles.sectionTitle}>{section1}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.headerToggle,
            {
              borderBottomColor:
                section === 2 ? colors.tenleyGreen : 'transparent',
            },
          ]}
          onPress={onPress}>
          <Text style={styles.sectionTitle}>{section2}</Text>
        </TouchableOpacity> */}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  headerBar: {
    height: 50,
    flexDirection: 'row',
    borderBottomWidth: 2,
    borderBottomColor: colors.lightGray,
    paddingHorizontal: 20,
    marginTop: 10,
    justifyContent: 'flex-end',
  },
  headerText: {
    width: 71,
    color: colors.darkGreen,
    fontFamily: 'Poppins-Bold',
    fontSize: 16,
    letterSpacing: 0.75,
    lineHeight: 26,
    textAlign: 'center',
    alignSelf: 'flex-end',
    marginBottom: 5,
  },
  headerToggle: {
    marginHorizontal: 5,
    borderBottomWidth: 1,
    borderBottomColor: 'transparent',
    justifyContent: 'flex-end',
  },
  title: {
    color: colors.darkGreen,
    fontFamily: 'Poppins-Bold',
    fontSize: 16,
    letterSpacing: 0.75,
    lineHeight: 26,
    textAlign: 'center',
    alignSelf: 'flex-end',
    marginBottom: 5,
  },
  sectionTitle: {
    marginHorizontal: 5,
    color: colors.darkGreen,
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    letterSpacing: 0.88,
    lineHeight: 22,
    textAlign: 'center',
    alignSelf: 'flex-end',
    marginBottom: 5,
  },
});

Header.defaultProps = {
  onPress: () => {},
  header: null,
  secondary: false,
  disabled: false,
};
