import React, {useState} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import styles from '../theme/theme';
import {useTranslation} from 'react-i18next';

const SelectGenderHorizontal = () => {
  const [male, setMale] = useState(true);
  const [female, setFemale] = useState(false);
  const {t} = useTranslation();

  return (
    <View style={{...styles.container, flexDirection: 'row'}}>
      {!male ? (
        <TouchableOpacity
          style={styles.selectHeaderHorizontal}
          onPress={() => setMale(true) || setFemale(false)}>
          <Text style={styles.selectTextHorizontal}>{t('Male')}</Text>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity
          style={styles.selectHeaderHorizontaltrue}
          onPress={() => setMale(true) || setFemale(false)}>
          <Text style={styles.selectTextHorizontaltrue}>{t('Male')}</Text>
        </TouchableOpacity>
      )}
      {!female ? (
        <TouchableOpacity
          style={styles.selectHeaderHorizontal}
          onPress={() => setMale(false) || setFemale(true)}>
          <Text style={styles.selectTextHorizontal}>{t('Female')}</Text>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity
          style={styles.selectHeaderHorizontaltrue}
          onPress={() => setMale(false) || setFemale(true)}>
          <Text style={styles.selectTextHorizontaltrue}>{t('Female')}</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

export default SelectGenderHorizontal;
