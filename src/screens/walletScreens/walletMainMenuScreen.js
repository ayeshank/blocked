import React, {useState} from 'react';
import {View, Text, StyleSheet, Dimensions} from 'react-native';
import {forwardArrow, arrowDropdown} from '../../theme/theme';
import Wrapper from '../../components/wrapper';
import WhiteButton from '../../components/CustomWhiteButton';
import {useNavigation} from '@react-navigation/native';

const WalletMainMenu = () => {
  const navigation = useNavigation();
  const [showRecoveryPhase, setShowRecoveryPhase] = useState(false);

  const handleToggleRecoveryPhase = () => {
    setShowRecoveryPhase(!showRecoveryPhase);
  };

  return (
    <Wrapper>
      <View style={styles.container}>
        <View style={styles.buttonContainer}>
          <WhiteButton
            name="BlockEd Wallet"
            icon={forwardArrow}
            onPress={() => navigation.navigate('UploadKYCDocs')}></WhiteButton>
          <Text></Text>

          <WhiteButton
            name="Recovery Phrase"
            icon={showRecoveryPhase ? arrowDropdown : forwardArrow}
            onPress={handleToggleRecoveryPhase}></WhiteButton>
          {/* <Text></Text> */}
          {showRecoveryPhase && (
            <View style={styles.recoveryContainer}>
              <Text style={styles.recoveryText}>
                Your Recovery Phrase is : Beren
              </Text>
            </View>
          )}
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
    borderRadius: 7,
  },
  recoveryText: {
    paddingVertical: 13,
    paddingHorizontal: 10,
    textAlign: 'left',
    fontSize: 15,
    fontWeight: '700',
    color: 'white',
  },
});

export default WalletMainMenu;
