import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import UploadInputField from '../../components/UploadInputField';
import Wrapper from '../../components/wrapper';
import styles, {add} from '../../theme/theme';
import Button from '../../components/Button';
import {useNavigation} from '@react-navigation/native';
import {useTranslation} from 'react-i18next';
import {uploadKYCDocs} from '../../reducers/walletActions';
import {connect} from 'react-redux';
import Snackbar from 'react-native-snackbar';
import LoadingButton from '../../components/LoadingButton';

const UploadKYCDocsScreen = ({uploadKYCDocs}) => {
  const {t} = useTranslation();
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);
  const [govtID, setGovtID] = useState();
  const [address, setAddress] = useState();

  const handleFileSelected = (action, fileData) => {
    if (action === 'ID') {
      setGovtID(fileData);
    } else if (action === 'Address') {
      setAddress(fileData);
    }
  };

  const handleUploadDocs = async () => {
    if (govtID || address) {
      try {
        setLoading(true);
        var formdata = new FormData();
        if (govtID) {
          formdata.append('file', {
            uri: govtID.uri,
            name: govtID.name,
            type: govtID.type,
          });
        } else if (address) {
          formdata.append('file', {
            uri: address.uri,
            name: address.name,
            type: address.type,
          });
        }
        const data = await uploadKYCDocs(formdata);
        Snackbar.show({
          backgroundColor: 'green',
          text: t('KYC-Document(s) are uploaded successfully.'),
          // Will notify you once it is verified
          duration: Snackbar.LENGTH_LONG,
        });
        setLoading(false);
        navigation.navigate('TokenMenu');
      } catch (error) {
        setLoading(false);
        Snackbar.show({
          backgroundColor: 'red',
          text: t('Some Error Occured'),
          duration: Snackbar.LENGTH_LONG,
        });
        // Handle error case if needed
      }
    } else {
      Snackbar.show({
        backgroundColor: 'red',
        text: t('You must upload any one of the KYC documnet'),
        duration: Snackbar.LENGTH_LONG,
      });
    }
  };

  return (
    <Wrapper>
      <View style={myStyles.container}>
        <Text style={myStyles.text}>
          {t(
            'In order that we can redeem your Tokens so that you can use it for different purposes, please complete our Know Your Consumer (KYC) steps. Have your Government ID and Proof of Address Documents ready for these steps.',
          )}
        </Text>
        {govtID ? (
          <UploadInputField
            placeholder={govtID.name}
            action="ID"
            onFileSelected={handleFileSelected}
          />
        ) : (
          <UploadInputField
            placeholder={t('Upload Your Government ID')}
            action="ID"
            onFileSelected={handleFileSelected}
          />
        )}
        <Text></Text>
        {address ? (
          <UploadInputField
            placeholder={address.name}
            action="Address"
            onFileSelected={handleFileSelected}
          />
        ) : (
          <UploadInputField
            placeholder={t('Upload Your Proof of Address')}
            action="Address"
            onFileSelected={handleFileSelected}
          />
        )}
      </View>
      <View style={styles.bottomFixedComponent}>
        {loading ? (
          <LoadingButton />
        ) : (
          <Button name={'Submit'} onPress={() => handleUploadDocs()} />
        )}
      </View>
    </Wrapper>
  );
};

const myStyles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    padding: 16,
  },
  text: {
    textAlign: 'center',
    fontSize: 15,
    fontWeight: '400',
    color: 'black',
    marginBottom: 16,
    lineHeight: 20.46,
  },
});

export default connect(null, {uploadKYCDocs})(UploadKYCDocsScreen);
