import React from 'react';
import {View, Modal, Text, TouchableOpacity, StyleSheet} from 'react-native';
// import styles from '../theme/theme';

const LogoutDialog = ({visible, onClose, onLogout}) => {
  return (
    <Modal visible={visible} transparent={true}>
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text style={styles.modalText}>Are you sure you want to logout?</Text>
          <View style={styles.modalButtonsContainer}>
            <TouchableOpacity onPress={onLogout}>
              <Text style={styles.modalButton}>Yes</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={onClose}>
              <Text style={styles.modalButton}>No</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 5,
    alignItems: 'flex-end',
  },
  modalText: {
    fontSize: 18,
    fontWeight: '600',
    color: 'black',
    marginBottom: 50,
    textAlign: 'center',
  },
  modalButtonsContainer: {
    flexDirection: 'row',
    marginHorizontal: 0,
    justifyContent: 'space-around',
  },
  modalButton: {
    marginLeft: 30,
    fontSize: 16,
    fontWeight: '700',
    color: '#3FB65F',
  },
});
export default LogoutDialog;
