import React from 'react';
import {View, TextInput} from 'react-native';
import styles from '../theme/theme';

const DisableTextBox = ({name}) => {
  return (
    <View style={styles.inputTextHeader}>
      <View style={styles.textBoxContianer}>
        <TextInput
          value={name}
          placeholderTextColor="#fff"
          style={styles.inputText}
          editable={false}
        />
      </View>
    </View>
  );
};

export default DisableTextBox;
