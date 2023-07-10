import {triangleIcon} from '../theme/theme';
import React, {useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  Dimensions,
} from 'react-native';
import {useTranslation} from 'react-i18next'; // Import useTranslation hook
import i18n from '../i18n';

const languageData = [
  {code: 'en', name: 'English'},
  {code: 'ur', name: 'Urdu'},
  // Add more languages as needed
];

const LanguageDropdown = () => {
  const {t} = useTranslation(); // Access the translation function

  const [open, setOpen] = useState(false);

  const handleLanguageChange = languageCode => {
    i18n.changeLanguage(languageCode);
    setOpen(false);
  };

  return (
    <View>
      <TouchableOpacity onPress={() => setOpen(!open)}>
        <View style={styles.dropdownContainer}>
          <Text style={styles.languages}>
            {t('choose_language')} {'  '}
            <Image source={triangleIcon} />
          </Text>
        </View>
      </TouchableOpacity>
      {open && (
        <View style={styles.languageContainer}>
          {languageData.map(language => {
            return (
              <TouchableOpacity
                key={language.code}
                onPress={() => handleLanguageChange(language.code)}
                style={styles.languageItem}>
                <Text style={styles.language}>{t(language.name)}</Text>
              </TouchableOpacity>
            );
          })}
        </View>
      )}
    </View>
  );
};

const WidthDimension = Dimensions.get('window').width;
const HeightDimension = Dimensions.get('window').height;

const styles = StyleSheet.create({
  dropdownContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 15,
  },
  languages: {
    fontSize: 16,
    color: '#010169',
    fontWeight: '700',
    marginRight: 5,
  },
  languageContainer: {
    position: 'absolute',
    top: 40,
    marginLeft: 12,
    left: 0,
    backgroundColor: '#ffffff',
    padding: 10,
    width: WidthDimension * 0.42,
    zIndex: 1,
  },
  languageItem: {
    marginBottom: 10,
  },
  language: {
    fontSize: 16,
    color: '#4D4D4D',
    fontWeight: '500',
  },
});

export default LanguageDropdown;
