import React, {useState, useEffect} from 'react';
import {
  Text,
  TouchableOpacity,
  View,
  Dimensions,
  ScrollView,
  Image,
  StyleSheet,
} from 'react-native';
import GlobalHeader from '../components/GlobalHeader';
import {
  algebraCourseLogo2,
  mathCourseLogo,
  uploadIcon,
  dropdown2,
} from '../theme/theme';
import Wrapper from '../components/wrapper';
import Button from '../components/Button';
import SearchTextField from '../components/SearchTextField';
import {useTranslation} from 'react-i18next';
import {useNavigation} from '@react-navigation/native';

const WidthDimension = Dimensions.get('window').width;

const Card = ({name, price, imageUrl}) => {
  const handleDropdownPress = () => {
    console.log(`Dropdown button pressed for ${name}`);
    // Add your logic for the dropdown button press here
  };

  return (
    <View style={styles.cardContainer}>
      <View style={styles.leftContent}>
        <Image source={imageUrl} style={styles.cardImage} />
        <View style={styles.leftTextContainer}>
          <Text style={styles.cardTitle}>{name}</Text>
        </View>
      </View>
      <View style={styles.rightContent}>
        <View style={styles.rightContentContainer}>
          <Text style={styles.cardPrice}>{price}</Text>
          <TouchableOpacity
            style={styles.dropdownButton}
            onPress={handleDropdownPress}>
            <Image source={dropdown2} />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const CourseCheckout = () => {
  const navigation = useNavigation();
  const {t} = useTranslation();
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
      imageUrl: algebraCourseLogo2,
    },
  ];
  return (
    <Wrapper>
      <GlobalHeader />
      <SearchTextField />
      <ScrollView>
        <View style={styles.container}>
          {courses.map(course => (
            <Card
              key={course.id}
              name={course.title}
              price={course.price}
              imageUrl={course.imageUrl}
            />
          ))}
        </View>
        <TouchableOpacity onPress={() => console.log('press')}>
          <View style={styles.buttonContainer}>
            <Image source={uploadIcon} />
            <Text style={styles.buttonText}>
              {'   '}
              {t('Coupon/ Credit for free Course(S)')}
            </Text>
          </View>
        </TouchableOpacity>
        <View style={styles.totalDetailContainer}>
          <Text style={styles.totalText}>{t('Total')}</Text>
          <Text style={styles.totalPrice}>$105.5</Text>
        </View>
        <View style={styles.totalDetailContainer}>
          <Text style={styles.totalText}>
            {t('Credit Free Courses Selected')}
          </Text>
          <Image source={dropdown2} />
        </View>
      </ScrollView>
      <Button
        name={t('Pay_In_BlockEd_Wallet')}
        onPress={() => console.log('hello')}
      />
    </Wrapper>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 15,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F4F7FC',
  },
  cardContainer: {
    flexDirection: 'row',
    width: '100%',
    marginBottom: 22,
    padding: 1,
    backgroundColor: '#F4F7FC',
    borderRadius: 8,
  },
  leftContent: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  cardImage: {
    width: 67,
    height: 67,
    marginRight: 10,
    borderRadius: 0,
  },
  leftTextContainer: {
    flex: 1,
    maxWidth: '70%', // Adjust the width as needed
  },
  cardTitle: {
    fontSize: 15,
    fontWeight: 'bold',
  },
  rightContent: {
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
  rightContentContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  cardPrice: {
    fontSize: 15,
    marginBottom: 8,
    marginRight: 8,
  },
  dropdownButton: {
    flex: 1,
    marginTop: 9,
    marginRight: 16,
  },
  buttonContainer: {
    flexDirection: 'row',
    backgroundColor: 'white',
    padding: 12,
    alignItems: 'center',
    elevation: 4,
    marginHorizontal: 16,
  },
  buttonText: {
    fontSize: 15,
    fontWeight: 'bold',
  },
  totalDetailContainer: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 15,
    marginHorizontal: 16,
  },
  totalText: {
    fontSize: 17,
    flex: 1,
    fontWeight: 'bold',
    color: '#262626',
    textAlign: 'left',
  },
  totalPrice: {
    color: '#3FB65F',
    fontWeight: 'bold',
    fontSize: 17,
  },
});

export default CourseCheckout;
