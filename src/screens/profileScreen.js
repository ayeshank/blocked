import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  ScrollView,
  SafeAreaView,
  ActivityIndicator,
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
  const [token, setToken] = useState();
  const [loading, setLoading] = useState(true);
  const [QRCode, setQRCode] = useState('');
  const code = JSON.stringify(QRCode);

  //   useEffect(() => {
  //     getToken();
  //   }, []);
  //   useEffect(() => {
  //     qrAPI();
  //   }, [token]);

  //   const getToken = async () => {
  //     setToken(await AsyncStorage.getItem('otptoken'));
  //   };
  //   const tokenData = useSelector(state => state?.wallet?.token);
  //   // console.log("user", user);
  //   const qrAPI = async () => {
  //     setLoading(true);
  //     return await fetch(
  //       'https://hopeaccelerated-backend.herokuapp.com/api/v1/auth/me',
  //       {
  //         method: 'GET',
  //         headers: {
  //           'content-type': 'application/json',
  //           authorization: `Bearer ${tokenData}`,
  //         },
  //       },
  //     )
  //       .then(data => data.json())
  //       .then(res => {
  //         console.log('res', res);
  //         setQRCode(res.data.user.qrcode);
  //         setLoading(false);
  //         setName(res.data.profile.firstName + ' ' + res.data.profile.lastName);
  //         setEmail(res.data.user.email);
  //         setPhoneNo(res.data.user.phone);
  //       })
  //       .catch(error => console.log(error), setLoading(false));
  //   };
  return (
    <Wrapper>
      <GlobalHeader />
      {/* <NavBar
        onOpen={() => navigation.dispatch(DrawerActions.openDrawer())}
        onBack={() => navigation.goBack()}
      /> */}
      <ScrollView>
        <SafeAreaView style={{marginVertical: 20}}>
          <View style={styles.notification}>
            <Text style={styles.forgotText}>{t('Notifications')}</Text>
            <ToggleButton />
          </View>
          <Text style={styles.setting}>{t('My Settings')}</Text>
          <View style={styles.qr}>
            {loading ? (
              <ActivityIndicator color="black" size={30} />
            ) : (
              <QRCode2 logoBackgroundColor={'white'} value={code} size={250} />
            )}
          </View>

          <Text style={styles.profileSubText}>{t('Name')}</Text>
          <DisableTextBox name={name} />
          <Text style={styles.profileSubText}>{t('Telephone_Number')}</Text>
          <DisableTextBox name={phoneNo} />
          <Text style={styles.profileSubText}>{t('Email')}</Text>
          <DisableTextBox name={email} />
          <Text style={styles.profileSubText}>
            {t('Change_your_Social_Networks')}
          </Text>
          <SocialButton />
        </SafeAreaView>
      </ScrollView>
    </Wrapper>
  );
};

export default ProfileScreen;
