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

const UploadInputField = ({placeholder, action, onFileSelected}) => {
  const handleUpload = async () => {
    try {
      const res = await DocumentPicker.pick({
        type: [DocumentPicker.types.allFiles],
      });

      // Pass the selected file data back to the parent component
      if (onFileSelected) {
        onFileSelected(action, {
          uri: res[0]?.uri,
          name: res[0]?.name,
          type: res[0]?.type,
          size: res[0]?.size,
        });
        console.log('res', res);
      }
    } catch (err) {
      // Handle error if needed
      if (!DocumentPicker.isCancel(err)) {
        console.log('Error:', err);
        // Show an error message to the user
      }
    }
  };
  return (
    <TouchableOpacity onPress={handleUpload} style={styles.container}>
      <TextInput style={styles.input} value={placeholder} editable={false} />
      <Image source={docIcon} />
    </TouchableOpacity>
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
});

export default UploadInputField;
