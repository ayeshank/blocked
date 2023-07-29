import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet, Dimensions, BackHandler} from 'react-native';
import {forwardArrow, arrowDropdown} from '../../theme/theme';
import Wrapper from '../../components/wrapper';
import WhiteButton from '../../components/CustomWhiteButton';
import {useNavigation} from '@react-navigation/native';
import {useTranslation} from 'react-i18next';
import AsyncStorage from '@react-native-async-storage/async-storage';

const WalletMainMenu = () => {
  const navigation = useNavigation();
  const {t} = useTranslation();
  const [showRecoveryPhase, setShowRecoveryPhase] = useState(false);
  const [recoveryPhase, setRecoveryPhase] = useState('');
  const [isKYCDocSubmitted, setIsKYCDocsSubmitted] = useState('false');

  const handleToggleRecoveryPhase = () => {
    setShowRecoveryPhase(!showRecoveryPhase);
  };
  const handleBackButton = () => {
    // Navigate back to the MainMenu screen
    navigation.navigate('MainMenu');
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
  useEffect(() => {
    const fetchWalletPinCode = async () => {
      const userRecoveryPhase = await AsyncStorage.getItem('walletSeedPhrase');
      setRecoveryPhase(userRecoveryPhase);
      const KYCdocsSubmitted = await AsyncStorage.getItem('isKycDocSubmitted');
      setIsKYCDocsSubmitted(KYCdocsSubmitted);
      console.log('MainMenu isKYCDocSubmitted: ', isKYCDocSubmitted);
    };

    fetchWalletPinCode();
  });
  return (
    <Wrapper>
      <View style={styles.container}>
        <View style={styles.buttonContainer}>
          <WhiteButton
            name={t('BlockEd Wallet')}
            icon={forwardArrow}
            onPress={() => {
              isKYCDocSubmitted == 'false'
                ? navigation.navigate('TokenMenu')
                : navigation.navigate('UploadKYCDocs');
            }}></WhiteButton>
          <Text></Text>

          <WhiteButton
            name={t('Recovery Phrase')}
            icon={showRecoveryPhase ? arrowDropdown : forwardArrow}
            onPress={handleToggleRecoveryPhase}></WhiteButton>
          {/* <Text></Text> */}
          {showRecoveryPhase && (
            <View style={styles.recoveryContainer}>
              <Text style={styles.recoveryText}>
                {t('Your Recovery Phrase is')} : {recoveryPhase}
              </Text>
            </View>
          )}
        </View>
      </View>
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
    borderRadius: 7,
  },
  recoveryText: {
    paddingVertical: 13,
    paddingHorizontal: 10,
    textAlign: 'left',
    fontSize: 15,
    fontWeight: '700',
    color: 'white',
  },
});

export default WalletMainMenu;
