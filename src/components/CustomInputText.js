import React from 'react';
import {View, TextInput} from 'react-native';
import styles from '../theme/theme';

const InputText = (
  {
    placeholder,
    value,
    onChangeText,
    secureTextEntry,
    onSubmitEditing,
    returnKeyType,
    keyboardType,
    style,
  },
  ref,
) => {
  return (
    <View style={styles.inputTextHeader}>
      <View style={styles.inputTextContainer}>
        <TextInput
          placeholderTextColor="black"
          style={styles.inputText}
          placeholder={placeholder}
          value={value}
          onChangeText={onChangeText}
          secureTextEntry={secureTextEntry}
          onSubmitEditing={onSubmitEditing}
          ref={ref}
          blurOnSubmit={returnKeyType === 'next' ? false : true}
          returnKeyType={returnKeyType}
          keyboardType={keyboardType}
        />
      </View>
    </View>
  );
};

const forwardInput = React.forwardRef(InputText);
export default forwardInput;
