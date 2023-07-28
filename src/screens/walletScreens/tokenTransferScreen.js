import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet, Dimensions, BackHandler} from 'react-native';
import {dropdown} from '../../theme/theme';
import Wrapper from '../../components/wrapper';
import WhiteButton from '../../components/CustomWhiteButton';
import {useNavigation} from '@react-navigation/native';
import {useTranslation} from 'react-i18next';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {sendToken} from '../../reducers/walletActions';
import {connect} from 'react-redux';
import TokenTransferModal from '../../components/TokenTransferModal';
import Snackbar from 'react-native-snackbar';

const TokenTransferScreen = ({route, sendToken}) => {
  const {user} = route.params;
  const [sentAmount, setSentAmount] = useState(0);
  const navigation = useNavigation();
  const {t} = useTranslation();
  const [walletBalance, setUserWalletBalance] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [snackbarVisible, setSnackbarVisible] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  // Function to handle opening the modal
  const openButtonModal = () => {
    setModalVisible(true);
  };

  // Function to handle closing the modal
  const closeModal = () => {
    setModalVisible(false);
  };

  const handleConfirmAmount = amount => {
    setSentAmount(amount);
    closeModal();
  };

  const handleTokenSentAmount = async () => {
    if (parseFloat(sentAmount) <= parseFloat(walletBalance)) {
      try {
        const data = await sendToken(sentAmount, user._id);
        setSnackbarMessage(t('Token Sent Successfully'));
        setSnackbarVisible(true);
      } catch (error) {
        setSnackbarMessage(t('Error occurred while sending token'));
        setSnackbarVisible(true);
      }
    } else {
      setSnackbarMessage(t('Error! In-Sufficient balance in the Wallet'));
      setSnackbarVisible(true);
    }
  };
  useEffect(() => {
    if (sentAmount > 0) {
      handleTokenSentAmount();
    }
  }, [sentAmount]);
  useEffect(() => {
    if (snackbarVisible) {
      Snackbar.show({
        backgroundColor: snackbarMessage.includes('Error') ? 'red' : 'green',
        text: snackbarMessage,
        duration: Snackbar.LENGTH_LONG,
      });
      setSnackbarVisible(false);
    }
  }, [snackbarVisible, snackbarMessage]);
  useEffect(() => {
    const fetchWalletPinCode = async () => {
      const userWalletBalance = await AsyncStorage.getItem('walletBalance');
      setUserWalletBalance(userWalletBalance);
    };
    fetchWalletPinCode();
  }, []);
  const handleBackButton = () => {
    // Navigate back to the MainMenu screen
    navigation.goBack();
    return true; // Return true to indicate that the back action is handled
  };
  useEffect(() => {
    // Override the default back button behavior
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      handleBackButton,
    );

    // Clean up the custom back button handler when the screen is unmounted
    return () => backHandler.remove();
  }, []);
  return (
    <Wrapper>
      <View style={styles.container}>
        <View style={styles.tokenContainer}>
          <Text style={styles.tokenNoText}>{walletBalance}</Text>
          <Text style={styles.tokenText}>{t('Tokens You Have')}</Text>
        </View>
        <View style={styles.buttonContainer}>
          <WhiteButton
            name={t('Tokens to be converted or sent')}
            icon={dropdown}
            onPress={value => openButtonModal(value)}></WhiteButton>
        </View>
      </View>
      {/* Render the modal component */}
      <TokenTransferModal
        visible={modalVisible}
        onClose={closeModal}
        onConfirm={handleConfirmAmount}
      />
    </Wrapper>
  );
};
const WidthDimension = Dimensions.get('window').width;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 16,
  },
  buttonContainer: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  recoveryContainer: {
    backgroundColor: '#3FB65E',
    elevation: 23,
    width: WidthDimension * 0.95,
  },
  recoveryText: {
    paddingVertical: 13,
    paddingHorizontal: 10,
    textAlign: 'left',
    fontSize: 15,
    fontWeight: '700',
    color: 'white',
  },
  tokenContainer: {
    flexDirection: 'column',
    width: WidthDimension * 0.95,
    marginHorizontal: 10,
    marginBottom: 20,
    backgroundColor: '#3FB65E',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    borderRadius: 10,
  },
  tokenNoText: {
    fontSize: 60,
    fontWeight: '400',
    color: 'white',
  },
  tokenText: {
    fontSize: 15,
    fontWeight: '400',
    color: 'white',
  },
});

export default connect(null, {sendToken})(TokenTransferScreen);
