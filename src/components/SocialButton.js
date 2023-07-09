import React from 'react';
import {View, Image, TouchableOpacity} from 'react-native';
import {facebook, youtube, google, instagram} from '../theme/theme';
import styles from '../theme/theme';

const SocialButton = () => {
  return (
    <View style={styles.socialButtonContainer}>
      <TouchableOpacity style={styles.socialButton}>
        <Image source={facebook} />
      </TouchableOpacity>
      <TouchableOpacity style={styles.socialButton}>
        <Image source={youtube} />
      </TouchableOpacity>
      <TouchableOpacity style={styles.socialButton}>
        <Image source={google} />
      </TouchableOpacity>
      <TouchableOpacity style={styles.socialButton}>
        <Image source={instagram} />
      </TouchableOpacity>
    </View>
  );
};

export default SocialButton;
