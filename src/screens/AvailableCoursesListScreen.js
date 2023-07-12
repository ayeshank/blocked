import React, {useState} from 'react';
import {
  Text,
  TouchableOpacity,
  View,
  Dimensions,
  ScrollView,
  Image,
  StyleSheet,
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

const Card = ({title, price, imageUrl}) => {
  return (
    <TouchableOpacity
      style={styles.cardContainer}
      onPress={() => console.log(`Clicked on ${title}`)}>
      <Image source={imageUrl} style={styles.cardImage} />
      <View style={styles.cardContent}>
        <Text style={styles.cardTitle}>{title}</Text>
        <Text style={styles.cardPrice}>{price}</Text>
      </View>
    </TouchableOpacity>
  );
};

const AvailableCoursesList = () => {
  const navigation = useNavigation();
  const {t} = useTranslation();
  const [selectedItem, setSelectedItem] = useState('');

  const handleMenuSelect = itemName => {
    setSelectedItem(itemName);
  };

  const courses = [
    {
      id: 1,
      title: 'Mathematics for Computer Games Development',
      price: '$24.99',
      imageUrl: mathCourseLogo,
    },
    {
      id: 2,
      title: 'Algebra for Computer Games Development',
      price: '$19.99',
      imageUrl: algebraCourseLogo3,
    },

    {
      id: 3,
      title: 'Python for Computer Games Development',
      price: '$24.99',
      imageUrl: pythonCourseLogo,
    },
    {
      id: 4,
      title: 'Physics for Computer Games Development',
      price: '$24.99',
      imageUrl: physicsCourseLogo,
    },

    // Add more courses as needed
  ];
  return (
    <Wrapper>
      {/* <GlobalHeader /> */}
      <ScrollView>
        <View style={styles.container}>
          {courses.map(course => (
            <Card
              key={course.id}
              title={course.title}
              price={course.price}
              imageUrl={course.imageUrl}
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

export default AvailableCoursesList;
