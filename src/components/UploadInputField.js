import React from 'react';
import {
  View,
  TextInput,
  Image,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import DocumentPicker from 'react-native-document-picker';
import {docIcon} from '../theme/theme';

const UploadInputField = ({placeholder, iconImage, fileTypes}) => {
  const handleUpload = async () => {
    try {
      const res = await DocumentPicker.pick({
        type: [DocumentPicker.types.images, DocumentPicker.types.pdf],
      });

      // Handle the selected file here

      console.log('Selected File:', res);
    } catch (error) {
      if (DocumentPicker.isCancel(error)) {
        console.log('User canceled the file selection');
      } else {
        console.log('Error:', error);
      }
    }
  };

  return (
    <View style={styles.container}>
      <TextInput style={styles.input} value={placeholder} editable={false} />
      <TouchableOpacity onPress={() => handleUpload}>
        <Image source={docIcon} style={styles.icon} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 2,
    paddingHorizontal: 10,
    borderRadius: 3,
    elevation: 5,
    backgroundColor: 'white',
  },
  input: {
    flex: 1,
    textAlign: 'left',
    color: 'black',
    borderRadius: 2,
  },
  icon: {
    // width: 20,
    // height: 20,
    // marginLeft: 10,
  },
});

export default UploadInputField;
