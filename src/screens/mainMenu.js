import React, {useState, useEffect} from 'react';
import {View, Dimensions, ScrollView, BackHandler} from 'react-native';
import GlobalHeader from '../components/GlobalHeader';
import styles from '../theme/theme';
import Wrapper from '../components/wrapper';
import Menus from '../components/Menus';
import SearchTextField from '../components/SearchTextField';
import {useNavigation} from '@react-navigation/native';
import {useTranslation} from 'react-i18next';
import LogoutDialog from '../components/LogoutDialog';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {TouchableOpacity} from 'react-native-gesture-handler';

const MainMenu = () => {
  const {t} = useTranslation();
  const navigation = useNavigation();
  const [selectedItem, setSelectedItem] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [isLogin, setLogin] = useState(true);

  const handleMenuSelect = itemName => {
    setSelectedItem(itemName);
  };

  const handleLogout = async () => {
    // Remove the session token or user data from AsyncStorage
    try {
      await AsyncStorage.removeItem('sessionToken');
      setLogin(false);
      navigation.navigate('Landing');
      // Close the modal after logout
      setShowModal(false);
      // Perform any additional actions upon successful logout
    } catch (error) {
      console.error('Error removing session token:', error);
    }
  };

  useEffect(() => {
    const backAction = () => {
      setShowModal(true);
      if (isLogin == false) {
        navigation.navigate('Landing');
      }
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
      <GlobalHeader />
      <ScrollView>
        <SearchTextField />
        <View style={{marginVertical: 0, marginBottom: 30}}>
          <View style={{marginTop: 0}}>
            <Menus
              name={t('Lesson')}
              screenName="AvailableCoursesList"
              navigation={navigation}
              onSelect={() => handleMenuSelect('Lesson')}
              selected={selectedItem}
            />
            <Menus
              name={t('Classroom')}
              screenName="TodayAppointmentCourses"
              navigation={navigation}
              onSelect={() => handleMenuSelect('Classroom')}
              selected={selectedItem}
            />
            <Menus
              name={t('Calender')}
              screenName="TodayAppointment"
              navigation={navigation}
              onSelect={() => handleMenuSelect('Calender')}
              selected={selectedItem}
            />
            <Menus
              name={t('My Wallet')}
              screenName="WalletStack"
              navigation={navigation}
              onSelect={() => handleMenuSelect('My Wallet')}
              selected={selectedItem}
            />
            <Menus
              name={t('My Profile')}
              screenName="Profile"
              navigation={navigation}
              onSelect={() => handleMenuSelect('My Profile')}
              selected={selectedItem}
            />
            <Menus
              name={t('Messages')}
              screenName="MessageScreen"
              navigation={navigation}
              onSelect={() => handleMenuSelect('Messages')}
              selected={selectedItem}
            />
            <TouchableOpacity onPress={() => setShowModal(true)}>
              <Menus
                name={t('Logout')}
                onSelect={() => handleMenuSelect('Logout')}
                selected={selectedItem}
              />
            </TouchableOpacity>
          </View>
        </View>
        <LogoutDialog
          visible={showModal}
          onClose={() => setShowModal(false)}
          onLogout={() => handleLogout()}
        />
      </ScrollView>
    </Wrapper>
  );
};

export default MainMenu;
