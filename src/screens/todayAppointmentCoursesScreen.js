import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  Dimensions,
  ScrollView,
  TouchableOpacity,
  BackHandler,
} from 'react-native';
import Wrapper from '../components/wrapper';
import {useNavigation} from '@react-navigation/native';
import {useTranslation} from 'react-i18next';
import {Calendar} from 'react-native-calendars';

const WidthDimension = Dimensions.get('window').width;
const HeightDimension = Dimensions.get('window').height;

const Card = ({title, date, imageUrl}) => {
  return (
    <TouchableOpacity
      style={myStyles.cardContainer}
      onPress={() => console.log(`Clicked on ${title}`)}>
      {/* <Image source={imageUrl} style={myStyles.cardImage} /> */}
      <View style={myStyles.cardContent}>
        <Text style={myStyles.cardTitle}>{title}</Text>
        <Text style={myStyles.cardPrice}>{date}</Text>
      </View>
    </TouchableOpacity>
  );
};
const TodayAppointmentCoursesScreen = () => {
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
  const courses = [
    {
      id: 1,
      title: 'Mathematics for Computer Games Development',
      date: 'Aug 20, 2023',
      //   imageUrl: mathCourseLogo,
    },
    {
      id: 2,
      title: 'Algebra for Computer Games Development',
      date: 'Aug 20, 2023',
      //   imageUrl: algebraCourseLogo3,
    },
    {
      id: 3,
      title: 'Mathematics for Computer Games Development',
      date: 'Aug 20, 2023',
      //   imageUrl: mathCourseLogo,
    },
    {
      id: 4,
      title: 'Algebra for Computer Games Development',
      date: 'Aug 20, 2023',
      //   imageUrl: algebraCourseLogo3,
    },
  ];

  return (
    <Wrapper>
      <View style={myStyles.container}>
        <Calendar
          onDayPress={handleDatePress}
          style={{
            borderRadius: 10,
            elevation: 5,
            // height: 250,
          }}
        />
      </View>
      <ScrollView>
        <View style={myStyles.containerCourseList}>
          {courses.map(course => (
            <Card
              key={course.id}
              title={course.title}
              date={course.date}
              imageUrl={course.imageUrl}
            />
          ))}
        </View>
      </ScrollView>
    </Wrapper>
  );
};

const myStyles = StyleSheet.create({
  container: {
    marginHorizontal: 10,
    marginVertical: 10,
  },
  containerCourseList: {
    flex: 1,
    padding: 16,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F4F7FC',
  },
  cardContainer: {
    flexDirection: 'row',
    width: '100%',
    marginBottom: 10,
    padding: 10,
    backgroundColor: '#FFF',
    borderRadius: 5,
    elevation: 2,
  },
  cardImage: {
    width: 94.48,
    height: 114,
    marginRight: 10,
    borderRadius: 0,
  },
  cardContent: {
    flex: 1,
    justifyContent: 'center',
  },
  cardTitle: {
    fontSize: 17,
    fontWeight: 'bold',
    color: '#262626',
  },
  cardPrice: {
    marginTop: 8,
    color: '#3FB65F',
    fontWeight: 'bold',
  },
});

// export default connect(null, {login})(RewardInterstitialScreen);
export default TodayAppointmentCoursesScreen;
