import React, {useContext, useState, useRef} from 'react';
import {SafeAreaView, Text, StyleSheet, View} from 'react-native';
import {Spacing, Typography} from '../../../utilities/styles';
import {Form, TextInput} from '../../../components/Form';
import {Button} from '../../../components/Button';
import {maskPhone} from '../../../utilities/validation';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
// import {GlobalContext} from '../../GlobalContext';

const Verification = ({navigation}) => {
  // const [globalData, setGlobalData] = useContext(GlobalContext);

  return (
    <>
      <SafeAreaView style={styles.container}>
        <Text style={styles.blockText}>
          Great, you’re almost done! Confirm your identity by selecting which of
          these addresses you’ve previously lived at.
        </Text>

        <View style={styles.bottomButtonsContainer}>
          <Button
            title="Submit"
            onPress={() =>
              navigation.reset({
                index: 0,
                routes: [{name: 'Accounts'}],
              })
            }
          />
        </View>
      </SafeAreaView>
    </>
  );
};

export default Verification;

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
  },
});
