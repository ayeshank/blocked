import React, {useState, useRef, useEffect} from 'react';
import {View, Text, BackHandler} from 'react-native';
import {connect} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import {useTranslation} from 'react-i18next';
import Button from '../../components/Button';
import SmoothPinCodeInput from 'react-native-smooth-pincode-input';
import {createWalletPinCode} from '../../reducers/walletActions';
import styles from '../../theme/theme';
import Wrapper from '../../components/wrapper';
import Snackbar from 'react-native-snackbar';
import LoadingButton from '../../components/LoadingButton';
import {useRoute} from '@react-navigation/native';

const ReEntereWalletPinScreen = ({createWalletPinCode}) => {
  const route = useRoute();
  const [rPinCode, setPinCOde] = useState('');
  const pinInput = useRef();
  const {t} = useTranslation();
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);
  const {pinCode} = route.params;

  const handleCreateWalletPin = async () => {
    if (pinCode == rPinCode) {
      try {
        setLoading(true);
        console.log('rPinCode', rPinCode);
        const data = await createWalletPinCode(rPinCode);
        Snackbar.show({
          backgroundColor: 'green',
          text: t('Wallet Pin Code Created'),
          duration: Snackbar.LENGTH_LONG,
        });
        setLoading(false); // Set loading to false after successful registration
        navigation.navigate('CreateRecoveryPhase');
      } catch (error) {
        setLoading(false);
        Snackbar.show({
          backgroundColor: 'red',
          text: t('Some Error Occured'),
          duration: Snackbar.LENGTH_LONG,
        });
        // Handle error case if needed
      }
    } else {
      Snackbar.show({
        backgroundColor: 'red',
        text: t('Pin Code Doesnt Match'),
        duration: Snackbar.LENGTH_LONG,
      });
    }
  };
  useEffect(() => {
    const backAction = () => {
      navigation.navigate('MainMenu');
      return true; // Return true to indicate that the back action is handled
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );

    return () => backHandler.remove(); // Clean up the event listener on component unmount
  }, []);
  return (
    <Wrapper>
      <Text
        style={{...styles.mobileNumberText, fontSize: 15, fontWeight: '400'}}>
        {t('You are requested to create your')}
      </Text>
      <Text style={{...styles.mobileNumberText, fontSize: 15, marginTop: 0}}>
        {t('Wallet PIN')}
      </Text>
      <Text></Text>
      <View style={{marginVertical: 10}}>
        <Text style={{...styles.mobileNumberSubText, marginVertical: 5}}>
          {t('Re-Enter Your PIN')}
        </Text>
      </View>
      <View
        style={{
          justifyContent: 'center',
          alignItem: 'center',
          alignSelf: 'center',
        }}>
        <SmoothPinCodeInput
          ref={pinInput}
          secureTextEntry={true}
          cellSize={55}
          codeLength={4}
          cellStyle={{
            borderWidth: 2,
            borderColor: 'white',
            backgroundColor: 'white',
            borderRadius: 30,
            elevation: 4,
            marginLeft: 10,
          }}
          cellStyleFocused={{
            borderColor: '#3FB65F',
            backgroundColor: '#3FB65F',
          }}
          textStyle={{
            fontSize: 24,
            color: '#3FB65F',
          }}
          value={rPinCode}
          onTextChange={rPinCode => setPinCOde(rPinCode)}
          containerStyle={{
            marginVertical: 12,
            justifyContent: 'center',
            // alignItem: 'center',
          }}
          codeInputStyle={{
            color: 'white',
          }}
        />
      </View>
      <Text></Text>
      <View style={{position: 'absolute', bottom: 0, alignSelf: 'center'}}>
        {loading ? (
          <LoadingButton />
        ) : (
          <Button name={t('Next')} onPress={() => handleCreateWalletPin()} />
        )}
      </View>
    </Wrapper>
  );
};

export default connect(null, {createWalletPinCode})(ReEntereWalletPinScreen);
