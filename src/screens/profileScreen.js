import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  ScrollView,
  SafeAreaView,
  ActivityIndicator,
  BackHandler,
} from 'react-native';
import GlobalHeader from '../components/GlobalHeader';
// import NavBar from '../components/NavBar';
import ToggleButton from '../components/ToggleButton';
import DisableTextBox from '../components/DisableTextBox';
import SocialButton from '../components/SocialButton';
import styles from '../theme/theme';
import Wrapper from '../components/wrapper';
// import { DrawerActions } from "@react-navigation/native";
import QRCode2 from 'react-native-qrcode-svg';
// import { QRCode } from "../theme/theme";
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation} from '@react-navigation/native';
import {useTranslation} from 'react-i18next';

const ProfileScreen = () => {
  const {t} = useTranslation();
  const navigation = useNavigation();
  const [name, setName] = useState('Ayesha Noor Khan');
  const [phoneNo, setPhoneNo] = useState('+923328224649');
  const [email, setEmail] = useState('ayeshanoorank19@gmail.com');
  const [loading, setLoading] = useState(false);
  const [QRCode, setQRCode] = useState('');
  const code = JSON.stringify(QRCode);

  const getProfileData = async () => {
    setName(await AsyncStorage.getItem('userName'));
    setPhoneNo(await AsyncStorage.getItem('userPhone'));
    setEmail(await AsyncStorage.getItem('userEmail'));
    setQRCode(await AsyncStorage.getItem('userQRcode'));
    console.log('name', await AsyncStorage.getItem('userName'));
    console.log('phone', await AsyncStorage.getItem('userPhone'));
    console.log('email', await AsyncStorage.getItem('userEmail'));
    console.log('qrcode', await AsyncStorage.getItem('userQRcode'));
  };

  useEffect(() => {
    getProfileData();
  }, []);

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
  return (
    <Wrapper>
      <GlobalHeader />
      {/* <NavBar
        onOpen={() => navigation.dispatch(DrawerActions.openDrawer())}
        onBack={() => navigation.goBack()}
      /> */}
      <ScrollView>
        <SafeAreaView style={{marginVertical: 20}}>
          <Text style={styles.profileTitle}>{t('BlockEd Profile')}</Text>
          <Text style={styles.setting}>{t('My Settings')}</Text>
          <View style={styles.qr}>
            {loading ? (
              <ActivityIndicator color="black" size={30} />
            ) : (
              <QRCode2 logoBackgroundColor={'white'} value={code} size={250} />
            )}
          </View>

          {/* <Text style={styles.profileSubText}>{t('Name')}</Text> */}
          <DisableTextBox name={name} />
          {/* <Text style={styles.profileSubText}>{t('Telephone_Number')}</Text> */}
          <DisableTextBox name={phoneNo} />
          {/* <Text style={styles.profileSubText}>{t('Email')}</Text> */}
          <DisableTextBox name={email} />
          <View style={styles.notification}>
            <Text style={styles.pushNotification}>
              {t('Push Notifications')}
            </Text>
            <ToggleButton />
          </View>
          {/* <Text style={styles.profileSubText}>
            {t('Change_your_Social_Networks')}
          </Text> */}
          <SocialButton />
        </SafeAreaView>
      </ScrollView>
    </Wrapper>
  );
};

export default ProfileScreen;
