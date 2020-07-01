import React from 'react';
import {
  StyleSheet,
  View,
  Image,
  SafeAreaView,
  TouchableHighlight,
  TouchableWithoutFeedback,
  Text,
  Modal,
} from 'react-native';
import PropTypes from 'prop-types';
import {Button} from '../components/Button';
import {colors} from '../utilities/styles';

export const GreenModal = ({onClose, visible, children, style, closeOnX}) => {
  return (
    <SafeAreaView>
      <Modal animationType="fade" visible={visible} transparent>
        <TouchableWithoutFeedback onPress={onClose}>
          <View style={styles.backgroundPress}>
            <View style={styles.centeredView}>
              <View style={[style, styles.modalView]}>
                {closeOnX && (
                  <Image
                    source={require('../assets/icons/close.png')}
                    resizeMode="contain"
                    style={{
                      position: 'absolute',
                      top: 20,
                      right: 20,
                      zIndex: 100,
                    }}
                  />
                )}
                {children}
              </View>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  backgroundPress: {
    backgroundColor: colors.transparentGreen,
    flex: 1,
  },
  modalView: {
    // flex: 1,
    width: '90%',
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 5,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
});

Modal.propTypes = {
  visible: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  closeOnX: PropTypes.bool,
};
Modal.defaultProps = {
  visible: false,
  onClose: () => {},
  closeOnX: false,
};
