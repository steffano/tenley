import React from 'react';
import {View, StyleSheet} from 'react-native';

const Bullet = ({color, small}) => {
  return (
    <>
      <View
        style={{
          width: 20,
          height: small ? 10 : 20,
          alignItems: 'center',
          justifyContent: 'center',
          //   backgroundColor: 'red',
        }}>
        <View
          style={{
            backgroundColor: color,
            height: small ? 5 : 10,
            width: small ? 3 : 10,
            borderRadius: 20,
            paddingBottom: 5,
          }}
        />
      </View>
    </>
  );
};

export default Bullet;

const styles = StyleSheet.create({
  progressVisualFull: {
    display: 'flex',
    height: 10,
    margin: 20,
    borderRadius: 10,
  },
});
