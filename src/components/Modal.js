import React from 'react';
import {
  StyleSheet,
  View,
  TouchableHighlight,
  TouchableWithoutFeedback,
  Text,
  Modal,
} from 'react-native';
import PropTypes from 'prop-types';
import {Button} from '../components/Button';
import {colors} from '../utilities/styles';

export const GreenModal = ({onClose, visible, children, style}) => {
  return (
    <>
      <Modal animationType="fade" visible={visible} transparent>
        <TouchableWithoutFeedback onPress={onClose}>
          <View style={styles.backgroundPress}>
            <View style={styles.centeredView}>
              <View style={[style, styles.modalView]}>
                {children}

                {/* <TouchableHighlight onPress={onClose}>
                  <Text>Hide Modal</Text>
                </TouchableHighlight> */}
              </View>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  backgroundPress: {
    backgroundColor: colors.transparentGreen,
    flex: 1,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 10,
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
};
Modal.defaultProps = {
  visible: false,
  onClose: () => {},
};
