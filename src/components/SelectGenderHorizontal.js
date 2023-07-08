import React, {useState} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import styles from '../theme/theme';

const SelectGenderHorizontal = () => {
  const [male, setMale] = useState(true);
  const [female, setFemale] = useState(false);

  return (
    <View style={{...styles.container, flexDirection: 'row'}}>
      {!male ? (
        <TouchableOpacity
          style={styles.selectHeaderHorizontal}
          onPress={() => setMale(true) || setFemale(false)}>
          <Text style={styles.selectTextHorizontal}>Male</Text>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity
          style={styles.selectHeaderHorizontaltrue}
          onPress={() => setMale(true) || setFemale(false)}>
          <Text style={styles.selectTextHorizontaltrue}>Male</Text>
        </TouchableOpacity>
      )}
      {!female ? (
        <TouchableOpacity
          style={styles.selectHeaderHorizontal}
          onPress={() => setMale(false) || setFemale(true)}>
          <Text style={styles.selectTextHorizontal}>Female</Text>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity
          style={styles.selectHeaderHorizontaltrue}
          onPress={() => setMale(false) || setFemale(true)}>
          <Text style={styles.selectTextHorizontaltrue}>Female</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

export default SelectGenderHorizontal;
