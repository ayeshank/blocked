import React, {useState} from 'react';
import {View, Text, StyleSheet, Dimensions} from 'react-native';
import {forwardArrow, arrowDropdown, dropdown} from '../../theme/theme';
import Wrapper from '../../components/wrapper';
import WhiteButton from '../../components/CustomWhiteButton';
import {useNavigation} from '@react-navigation/native';
import {useTranslation} from 'react-i18next';

const TokenTransferScreen = () => {
  const navigation = useNavigation();
  const {t} = useTranslation();
  return (
    <Wrapper>
      <View style={styles.container}>
        <View style={styles.tokenContainer}>
          <Text style={styles.tokenNoText}>715</Text>
          <Text style={styles.tokenText}>{t('Tokens You Have')}</Text>
        </View>
        <View style={styles.buttonContainer}>
          <WhiteButton
            name={t('Tokens to be converted or sent')}
            icon={dropdown}
            onPress={() => console.log('Sent')}></WhiteButton>
        </View>
      </View>
    </Wrapper>
  );
};
const WidthDimension = Dimensions.get('window').width;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 16,
  },
  buttonContainer: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  recoveryContainer: {
    backgroundColor: '#3FB65E',
    elevation: 23,
    width: WidthDimension * 0.95,
  },
  recoveryText: {
    paddingVertical: 13,
    paddingHorizontal: 10,
    textAlign: 'left',
    fontSize: 15,
    fontWeight: '700',
    color: 'white',
  },
  tokenContainer: {
    flexDirection: 'column',
    width: WidthDimension * 0.95,
    marginHorizontal: 10,
    marginBottom: 20,
    backgroundColor: '#3FB65E',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    borderRadius: 10,
  },
  tokenNoText: {
    fontSize: 60,
    fontWeight: '400',
    color: 'white',
  },
  tokenText: {
    fontSize: 15,
    fontWeight: '400',
    color: 'white',
  },
});

export default TokenTransferScreen;
