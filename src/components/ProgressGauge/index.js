import React from 'react';
import {View, StyleSheet} from 'react-native';

const ProgressLine = ({label, backgroundColor = '#e5e5e5', visualParts}) => {
  return (
    <>
      <View
        style={[styles.progressVisualFull, {backgroundColor: backgroundColor}]}>
        <View style={{flexDirection: 'row'}}>
          {visualParts.map((item, index) => {
            return (
              <View
                key={index}
                style={{
                  height: 10,
                  width: item.percentage,
                  backgroundColor: item.color,
                  borderTopLeftRadius: index === 0 ? 100 : 0,
                  borderBottomLeftRadius: index === 0 ? 100 : 0,
                }}
              />
            );
          })}
        </View>
      </View>
    </>
  );
};

export default ProgressLine;

const styles = StyleSheet.create({
  progressVisualFull: {
    display: 'flex',
    alignSelf: 'center',
    width: '99%',
    height: 10,
    // margin: 10,
    borderRadius: 100,
  },
});
