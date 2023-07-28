import React, {useState, useEffect} from 'react';
import {
  View,
  Modal,
  TextInput,
  StyleSheet,
  Text,
  TouchableOpacity,
} from 'react-native';
import Snackbar from 'react-native-snackbar';
import ErrorField from './CustomError';

const TokenTransferModal = ({visible, onClose, onConfirm}) => {
  const [amount, setAmount] = useState('');
  const [showError, setShowError] = useState(false);

  const handleConfirm = () => {
    if (!amount || parseFloat(amount) === '') {
      setShowError(true);
    } else {
      onConfirm(parseFloat(amount));
      setAmount('');
      setShowError(false);
    }
  };
  const handleClose = () => {
    onClose();
    setShowError(false);
  };
  return (
    <Modal animationType="fade" transparent={true} visible={visible}>
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text style={styles.modalText}>
            Enter the amount you wish to transfer
          </Text>
          <TextInput
            style={styles.input}
            placeholder="Enter amount"
            value={amount}
            onChangeText={setAmount}
            keyboardType="numeric"
          />
          {showError && (
            <View style={{textAlign: 'left'}}>
              <Text
                style={{
                  color: 'red',
                  fontSize: 13,
                  marginBottom: 10,
                  textAlign: 'left',
                }}>
                Amount cannot be empty or 0
              </Text>
            </View>
          )}
          <View style={styles.modalButtonsContainer}>
            <TouchableOpacity onPress={handleClose}>
              <Text style={styles.modalButton}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={handleConfirm}>
              <Text style={styles.modalButton}>Confirm</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
  },
  input: {
    padding: 10,
    marginVertical: 10,
    borderRadius: 7,
    color: 'black',
    borderColor: '#3FB65F',
    borderWidth: 1,
    // elevation: 4,
  },
  modalText: {
    fontSize: 17,
    fontWeight: '500',
    color: '#3FB65F',
    textAlign: 'left',
  },
  modalButtonsContainer: {
    flexDirection: 'row',
    marginHorizontal: 0,
    justifyContent: 'flex-end',
  },
  modalButton: {
    fontSize: 16,
    marginLeft: 5,
    color: 'white',
    borderRadius: 8,
    backgroundColor: '#3FB65F',
    padding: 15,
  },
});

export default TokenTransferModal;
