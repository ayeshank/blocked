import React from 'react';
import {View, TextInput, Image, StyleSheet} from 'react-native';
import {searchIcon, microphoneIcon} from '../theme/theme';
import {useTranslation} from 'react-i18next';

const SearchTextField = () => {
  const {t} = useTranslation();

  return (
    <View style={styles.container}>
      <Image source={searchIcon} style={styles.icon} />
      <TextInput
        style={styles.input}
        placeholder={t('Search All Courses')}
        textAlign="left"
      />
      <Image source={microphoneIcon} style={styles.icon} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    marginVertical: 30,
    alignItems: 'center',
    paddingHorizontal: 10,
    marginHorizontal: 15,
    borderRadius: 6,
    elevation: 5,
    backgroundColor: 'white',
  },
  icon: {
    width: 20,
    height: 20,
    marginRight: 10,
  },
  input: {
    flex: 1,
  },
});

export default SearchTextField;
