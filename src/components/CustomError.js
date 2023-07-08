import React from 'react';
import {View, Text} from 'react-native';
import styles from '../theme/theme';
import {useTranslation} from 'react-i18next';

const ErrorField = ({errortext}) => {
  const {t} = useTranslation();

  return (
    <View style={styles.errorCustom}>
      <Text
        style={{
          color: 'red',
          fontSize: 13,
          marginVertical: 0,
          textAlign: 'left',
        }}>
        {t(errortext)}
      </Text>
    </View>
  );
};

export default ErrorField;
