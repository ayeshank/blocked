import React from 'react';
import {View, Text, TouchableOpacity, Image} from 'react-native';
import styles from '../theme/theme';
import LinearGradient from 'react-native-linear-gradient';

const Button = ({name, onPress, icon}) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={onPress}>
        <LinearGradient
          colors={['#3FB65F', '#3FB65F']}
          start={{x: 1, y: 0}}
          end={{x: 0, y: 0}}
          style={styles.buttonHeader}>
          {icon != null ? (
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Image source={icon} />
              <Text style={styles.buttonText}>
                {'  '}
                {name}
              </Text>
            </View>
          ) : (
            <Text style={styles.buttonText}>{name}</Text>
          )}
        </LinearGradient>
      </TouchableOpacity>
    </View>
  );
};

export default Button;
