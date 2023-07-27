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
  // State to manage the modal visibility
  const [modalVisible, setModalVisible] = useState(false);

  // Function to handle opening the modal
  const openButtonModal = () => {
    setModalVisible(true);
  };

  // Function to handle closing the modal
  const closeModal = () => {
    setModalVisible(false);
  };

  // Function to handle confirming the amount in the modal
  const handleConfirmAmount = amount => {
    setSentAmount(amount);
    closeModal();
    handleTokenSentAmount(); // Call the original function to handle token transfer
  };
  const handleTokenSentAmount = async () => {
    console.log('walletBalance:', walletBalance);
    console.log('sentAmount:', sentAmount);
    console.log('sentAmount3:', parseFloat(sentAmount));
    console.log('sentAmount34:', parseFloat(walletBalance));
    console.log(
      'parseFloat(sentAmount) <= parseFloat(walletBalance) ',
      parseFloat(sentAmount) <= parseFloat(walletBalance),
    );
    if (parseFloat(sentAmount) <= parseFloat(walletBalance)) {
      try {
        console.log('sentAmount3:', parseFloat(sentAmount));
        console.log('sentAmount34:', parseFloat(walletBalance));
        const data = await sendToken(sentAmount, user._id);
        Snackbar.show({
          backgroundColor: 'green',
          text: t('Token Sent Successfully'),
          duration: Snackbar.LENGTH_LONG,
        });
      } catch (error) {
        Snackbar.show({
          backgroundColor: 'red',
          text: t('Error occurred while sending token'),
          duration: Snackbar.LENGTH_LONG,
        });
      }
    } else {
      Snackbar.show({
        backgroundColor: 'red',
        text: t('In-Sufficient balance in the Wallet'),
        duration: Snackbar.LENGTH_LONG,
      });
    }
  };

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
