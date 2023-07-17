import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  Dimensions,
} from 'react-native';

const WidthDimension = Dimensions.get('window').width;
const HeightDimension = Dimensions.get('window').height;

const WhiteButton = ({name, onPress, icon}) => {
  return (
    <View style={myStyles.container}>
      <TouchableOpacity onPress={onPress}>
        <View style={myStyles.itemsContainer}>
          <Text style={myStyles.buttonText}>{name}</Text>
          <Image source={icon} style={myStyles.myIcon} />
        </View>
      </TouchableOpacity>
    </View>
  );
};

const myStyles = StyleSheet.create({
  container: {
    width: WidthDimension * 0.95,
    backgroundColor: 'white',
    elevation: 4,
    borderRadius: 7,
  },
  itemsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderRadius: 5,

    marginVertical: 1,
    paddingHorizontal: 10,
    paddingVertical: 15,
    borderRadius: 10,
  },
  buttonText: {
    flex: 1, // Take up remaining space in the row
    textAlign: 'left',
    fontSize: 15,
    fontWeight: '400',
    color: 'black',
    lineHeight: 20.46,
  },
  myIcon: {
    width: 15,
    height: 15,
  },
});

export default WhiteButton;
