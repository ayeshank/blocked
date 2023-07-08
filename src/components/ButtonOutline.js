import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import styles from '../theme/theme';
import LinearGradient from 'react-native-linear-gradient';

const ButtonOutline = ({name, onPress}) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={onPress}>
        <LinearGradient
          colors={['transparent', 'transparent']}
          start={{x: 1, y: 0}}
          end={{x: 0, y: 0}}
          style={{
            ...styles.buttonHeader,
            borderColor: '#3FB65F',
            borderRadius: 5,
            borderWidth: 1,
          }}>
          <Text style={{...styles.buttonText, color: '#3FB65F'}}>{name}</Text>
        </LinearGradient>
      </TouchableOpacity>
    </View>
  );
};

export default ButtonOutline;
