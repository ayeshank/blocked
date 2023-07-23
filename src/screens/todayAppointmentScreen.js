import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  Dimensions,
  BackHandler,
} from 'react-native';
import styles from '../theme/theme';
import Wrapper from '../components/wrapper';
import {useNavigation} from '@react-navigation/native';
import {useTranslation} from 'react-i18next';
import {Calendar} from 'react-native-calendars';

const WidthDimension = Dimensions.get('window').width;
const HeightDimension = Dimensions.get('window').height;

const TodayAppointmentScreen = () => {
  const {t} = useTranslation();
  const navigation = useNavigation();
  const [selectedDate, setSelectedDate] = useState('');
  const getFormattedDate = date => {
    const options = {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    };
    const formattedDate = new Date(date).toLocaleDateString(undefined, options);
    return formattedDate;
  };
  const handleDatePress = day => {
    const selectedDay = day.dateString;
    setSelectedDate(selectedDay);
    // console.log(getFormattedDate(selectedDay));
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
  return (
    <Wrapper>
      <Text style={styles.greenTitleText}>
        {t('Schedule a live Remote Course')}
      </Text>

      <View style={myStyles.container}>
        <Calendar
          onDayPress={handleDatePress}
          style={{
            borderRadius: 10,
            elevation: 5,
            // height: 250,
          }}
          //   theme={{
          //     backgroundColor: 'red',
          //     calendarBackground: '#ffffff',
          //     textSectionTitleColor: '#b6c1cd',
          //     selectedDayBackgroundColor: '#00adf5',
          //     selectedDayTextColor: '#ffffff',
          //     todayTextColor: '#00adf5',
          //     dayTextColor: '#2d4150',
          //     textDisabledColor: '#d9e432',
          //   }}
        />
      </View>
    </Wrapper>
  );
};

const myStyles = StyleSheet.create({
  container: {
    marginHorizontal: 10,
    marginVertical: 50,
    // flex: 1,
    // justifyContent: 'center',
    // alignItems: 'center',
  },
  imageContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  adHereIconStyle: {
    width: 80,
    height: 80,
    // Additional styles for the image if needed
  },
  imageDesc: {
    fontSize: 20,
    fontWeight: '900',
    textAlign: 'center',
    fontFamily: 'Sansation_Regular',
    color: '#4D4D4D',
    paddingTop: 10,
  },
});

// export default connect(null, {login})(RewardInterstitialScreen);
export default TodayAppointmentScreen;
