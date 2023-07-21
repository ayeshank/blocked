import React, {useState, useEffect} from 'react';
import {
  Text,
  View,
  Dimensions,
  ScrollView,
  Image,
  StyleSheet,
  BackHandler,
} from 'react-native';
import {QRCode, addToCartIcon} from '../theme/theme';
import Wrapper from '../components/wrapper';
import Button from '../components/Button';
import SearchTextField from '../components/SearchTextField';
import {useTranslation} from 'react-i18next';
import {useNavigation} from '@react-navigation/native';
import {useRoute} from '@react-navigation/native';
import {useDispatch} from 'react-redux';
import {addToCart} from '../reducers/cartReducer';
import {TouchableOpacity} from 'react-native-gesture-handler';

const WidthDimension = Dimensions.get('window').width;

const CourseDetailView = () => {
  const route = useRoute();
  const {itemId, title, price, imageUrl, category} = route.params;
  const navigation = useNavigation();
  const {t} = useTranslation();

  const dispatch = useDispatch();

  const handleAddToCart = () => {
    const newItem = {itemId, title, price, imageUrl, category};
    dispatch(addToCart(newItem));
    navigation.navigate('CourseCheckout');
  };
  const handleBackButton = () => {
    // Navigate back to the MainMenu screen
    navigation.goBack();
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
      <ScrollView>
        <SearchTextField />
        <View style={styles.centerContainer}>
          <Image source={QRCode} style={styles.cardImage} />
          <Text style={styles.cardTitle}>{t(title)}</Text>
          <View style={styles.cardImageContainer}>
            <Image source={imageUrl} style={styles.cardImage} />
          </View>
          <View style={styles.imageDetailContainer}>
            <Text style={styles.courseCategory}>{category}</Text>
            <Text style={styles.cardPrice}>{price}</Text>
          </View>
        </View>
      </ScrollView>
      <TouchableOpacity onPress={() => handleAddToCart()}>
        <Button name={t('Cart')} icon={addToCartIcon} />
      </TouchableOpacity>
    </Wrapper>
  );
};

const styles = StyleSheet.create({
  centerContainer: {
    marginHorizontal: 92,
    alignItems: 'center',
    marginVertical: 13,
  },
  cardTitle: {
    fontSize: 17,
    fontWeight: 'bold',
    color: '#262626',
    textAlign: 'center',
    marginVertical: 15,
  },
  cardImageContainer: {
    borderColor: 'white',
    borderWidth: 20,
    borderRadius: 7,
    elevation: 7,
  },
  imageDetailContainer: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 15,
  },
  courseCategory: {
    fontSize: 17,
    flex: 1,
    fontWeight: 'bold',
    color: '#262626',
    textAlign: 'left',
  },
  cardPrice: {
    color: '#3FB65F',
    fontWeight: 'bold',
    fontSize: 17,
  },
});

export default CourseDetailView;
