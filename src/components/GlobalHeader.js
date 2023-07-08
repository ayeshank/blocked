import React from 'react';
import {View, Image} from 'react-native';
import {screen1logo} from '../../src/theme/theme';
import styles from '../theme/theme';

const GlobalHeader = () => {
  return (
    <View style={styles.globalHeader}>
      <Image source={screen1logo} />
    </View>
  );
};

export default GlobalHeader;
