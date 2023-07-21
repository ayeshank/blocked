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
import {useSelector} from 'react-redux';
import {useDispatch} from 'react-redux';
import {removeFromCart} from '../reducers/cartReducer';
import {clearCart} from '../reducers/cartReducer';
import Snackbar from 'react-native-snackbar';

const WidthDimension = Dimensions.get('window').width;

const Card = ({itemId, name, price, imageUrl}) => {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const handleDropdownPress = itemId => {
    const removeItem = itemId;
    dispatch(removeFromCart(removeItem));
    navigation.navigate('CourseCheckout');
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
            onPress={() => handleDropdownPress(itemId)}>
            <Image source={dropdown2} />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const CourseCheckout = () => {
  const navigation = useNavigation();
  const cartItems = useSelector(state => state.cart.items);
  const {t} = useTranslation();
  const dispatch = useDispatch();

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

  const handleWalletPayment = () => {
    console.log('clearcart');
    dispatch(clearCart());
    Snackbar.show({
      backgroundColor: 'green',
      text: 'Payment Successful',
      duration: Snackbar.LENGTH_LONG,
    });
    navigation.navigate('MainMenu');
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
      <SearchTextField />
      <ScrollView>
        <View style={styles.container}>
          {cartItems.length === 0 ? (
            <Text style={styles.emptyCart}>{t('No Item in Your Cart')}</Text>
          ) : (
            cartItems.map(course => (
              <Card
                key={course.itemId}
                itemId={course.itemId} // Add a unique key prop using the item's id
                name={course.title}
                price={course.price}
                imageUrl={course.imageUrl}
              />
            ))
          )}
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
        onPress={() => handleWalletPayment()}
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
  emptyCart: {
    paddingBottom: 23,
    fontSize: 18,
    color: 'red',
    fontWeight: '700',
  },
});

export default CourseCheckout;
