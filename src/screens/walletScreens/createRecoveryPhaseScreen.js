import React, {useState, useEffect} from 'react';
import {View, Text, BackHandler} from 'react-native';
import {connect} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import {useTranslation} from 'react-i18next';
import Button from '../../components/Button';
import InputText from '../../components/CustomInputText';
import {createRecoveryPhase} from '../../reducers/walletActions';
import styles from '../../theme/theme';
import Wrapper from '../../components/wrapper';
import Snackbar from 'react-native-snackbar';
import LoadingButton from '../../components/LoadingButton';
import ErrorField from '../../components/CustomError';

const CreateRecoveryPhaseScreen = ({createRecoveryPhase}) => {
  const [seedPhrase, setSeedPhrase] = useState('');
  const [seedError, setSeedError] = useState('');
  const {t} = useTranslation();
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);

  const handleCreateRecoveryPhase = async () => {
    if (seedPhrase) {
      try {
        setLoading(true);
        const data = await createRecoveryPhase(seedPhrase);
        Snackbar.show({
          backgroundColor: 'green',
          text: t('Seed Phrase Created'),
          duration: Snackbar.LENGTH_LONG,
        });
        setLoading(false); // Set loading to false after successful registration
        navigation.navigate('WalletMainMenu');
      } catch (error) {
        setLoading(false);
        console.log('error', error);
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
        text: t('Seed Phrase cannot be empty'),
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
      <Text style={styles.mobileNumberText}></Text>
      <View style={{marginVertical: 10}}>
        <Text style={{...styles.mobileNumberSubText, marginVertical: 5}}>
          {t('Create your recovery phrase')}
        </Text>
      </View>
      <View
        style={{
          justifyContent: 'center',
          alignItem: 'center',
          alignSelf: 'center',
        }}>
        <InputText
          placeholder={t('Seed Phrase')}
          value={seedPhrase}
          onChangeText={text => setSeedPhrase(text)}
          returnKeyType={'next'}
          keyboardType={'default'}
        />
        {/* {seedError && <ErrorField errortext="Seed Phrase is required" />} */}
      </View>
      <Text></Text>
      <View style={{position: 'absolute', bottom: 0, alignSelf: 'center'}}>
        {loading ? (
          <LoadingButton />
        ) : (
          <Button
            name={t('Submit')}
            onPress={() => handleCreateRecoveryPhase()}
          />
        )}
      </View>
    </Wrapper>
  );
};

export default connect(null, {createRecoveryPhase})(CreateRecoveryPhaseScreen);
