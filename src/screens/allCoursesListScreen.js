import React, {useState, useEffect} from 'react';
import {
  Text,
  TouchableOpacity,
  View,
  Dimensions,
  ScrollView,
  Image,
  StyleSheet,
  BackHandler,
} from 'react-native';
import {
  algebraCourseLogo3,
  pythonCourseLogo,
  mathCourseLogo,
  physicsCourseLogo,
} from '../theme/theme';
import Wrapper from '../components/wrapper';
import {useTranslation} from 'react-i18next';
import {useNavigation} from '@react-navigation/native';

const WidthDimension = Dimensions.get('window').width;

const Card = ({itemId, title, price, imageUrl, category}) => {
  const navigation = useNavigation();

  const handleCardPress = () => {
    navigation.navigate('CourseDetailView', {
      itemId,
      title,
      price,
      imageUrl,
      category,
    });
  };
  return (
    <TouchableOpacity
      style={styles.cardContainer}
      onPress={() => handleCardPress()}>
      <Image source={imageUrl} style={styles.cardImage} />
      <View style={styles.cardContent}>
        <Text style={styles.cardTitle}>{title}</Text>
        <Text style={styles.cardPrice}>{price}</Text>
        <Text style={styles.cardPrice}>{category}</Text>
      </View>
    </TouchableOpacity>
  );
};

const AllCoursesListScreen = () => {
  const navigation = useNavigation();
  const {t} = useTranslation();

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
      category: 'Maths',
      price: '$24.99',
      imageUrl: mathCourseLogo,
    },
    {
      id: 2,
      title: 'Algebra for Computer Games Development',
      category: 'Algebra',
      price: '$19.99',
      imageUrl: algebraCourseLogo3,
    },

    {
      id: 3,
      title: 'Python for Computer Games Development',
      category: 'Python',
      price: '$24.99',
      imageUrl: pythonCourseLogo,
    },
    {
      id: 4,
      title: 'Physics for Computer Games Development',
      category: 'Physics',
      price: '$24.99',
      imageUrl: physicsCourseLogo,
    },

    // Add more courses as needed
  ];
  return (
    <Wrapper>
      <ScrollView>
        <View style={styles.container}>
          {courses.map(course => (
            <Card
              key={course.id}
              itemId={course.id}
              title={course.title}
              price={course.price}
              imageUrl={course.imageUrl}
              category={course.category}
            />
          ))}
        </View>
      </ScrollView>
    </Wrapper>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F4F7FC',
    // backgroundColor: "#F5FCFF",
  },
  cardContainer: {
    flexDirection: 'row',
    width: '100%',
    marginBottom: 10,
    padding: 0,
    backgroundColor: '#FFF',
    borderRadius: 5,
    elevation: 5,
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

export default AllCoursesListScreen;
