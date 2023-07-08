import React from 'react';
import {Dimensions, StyleSheet, ImageBackground} from 'react-native';

const WidthDimension = Dimensions.get('window').width;
const HeightDimension = Dimensions.get('window').height;

const Wrapper = props => {
  return (
    <ImageBackground style={style.container}>{props.children}</ImageBackground>
  );
};

export default Wrapper;

const style = StyleSheet.create({
  container: {
    height: '100%',
    width: WidthDimension,
    backgroundColor: 'white',
  },
});
