import React, {useState, useEffect} from 'react';
import {View, Dimensions, ScrollView, BackHandler} from 'react-native';
import GlobalHeader from '../components/GlobalHeader';
import styles from '../theme/theme';
import Wrapper from '../components/wrapper';
import Menus from '../components/Menus';
import SearchTextField from '../components/SearchTextField';
import {useNavigation} from '@react-navigation/native';
import {useTranslation} from 'react-i18next';

const MainMenu = () => {
  const {t} = useTranslation();
  const navigation = useNavigation();
  const [selectedItem, setSelectedItem] = useState('');

  const handleMenuSelect = itemName => {
    setSelectedItem(itemName);
  };

  useEffect(() => {
    const backAction = () => {
      navigation.navigate('Landing');
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
              onSelect={() => handleMenuSelect('Lesson')}
              selected={selectedItem}
            />
            <Menus
              name={t('Classroom')}
              onSelect={() => handleMenuSelect('Classroom')}
              selected={selectedItem}
            />
            <Menus
              name={t('Calender')}
              onSelect={() => handleMenuSelect('Calender')}
              selected={selectedItem}
            />
            <Menus
              name={t('My Wallet')}
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
              onSelect={() => handleMenuSelect('Messages')}
              selected={selectedItem}
            />
            <Menus
              name={t('Logout')}
              onSelect={() => handleMenuSelect('Logout')}
              selected={selectedItem}
            />
          </View>
        </View>
      </ScrollView>
    </Wrapper>
  );
};

export default MainMenu;
