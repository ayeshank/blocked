import React, {useState} from 'react';
import {
  Text,
  View,
  Dimensions,
  ScrollView,
  Image,
  StyleSheet,
} from 'react-native';
import GlobalHeader from '../components/GlobalHeader';
import {algebraCourseLogo, QRCode, addToCart} from '../theme/theme';
import Wrapper from '../components/wrapper';
import Button from '../components/Button';
import SearchTextField from '../components/SearchTextField';
import {useTranslation} from 'react-i18next';
import {useNavigation} from '@react-navigation/native';

const WidthDimension = Dimensions.get('window').width;

const CourseDetailView = () => {
  const navigation = useNavigation();
  const {t} = useTranslation();
  const [selectedItem, setSelectedItem] = useState('');

  const handleMenuSelect = itemName => {
    setSelectedItem(itemName);
  };

  return (
    <Wrapper>
      <GlobalHeader />
      <ScrollView>
        <SearchTextField />
        <View style={styles.centerContainer}>
          <Image source={QRCode} style={styles.cardImage} />
          <Text style={styles.cardTitle}>
            {t('Mathematics for Computer Games Development')}
          </Text>
          <View style={styles.cardImageContainer}>
            <Image source={algebraCourseLogo} style={styles.cardImage} />
          </View>
          <View style={styles.imageDetailContainer}>
            <Text style={styles.courseCategory}>{t('Algebra')}</Text>
            <Text style={styles.cardPrice}>$55.5</Text>
          </View>
        </View>
      </ScrollView>
      <Button
        name={t('Cart')}
        onPress={() => console.log('hello')}
        icon={addToCart}
      />
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
