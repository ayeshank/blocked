import React, {useState, Component} from 'react';
import {View, Text, Image, TouchableOpacity} from 'react-native';

const Menus = ({
  iconimage,
  name,
  screenName,
  navigation,
  onSelect,
  selected,
}) => {
  const handlePress = () => {
    if (screenName) {
      navigation.navigate(screenName);
    }
    onSelect(name);
  };
  const backgroundColor = selected === name ? '#3FB65F' : '#F4F7FC';
  const textColor = selected === name ? '#F4F7FC' : '#4D4D4D';
  return (
    <TouchableOpacity onPress={handlePress}>
      <View
        style={[
          styles.menus,
          {
            backgroundColor,
          },
        ]}>
        {/* <Image
					source={iconimage}
					style={{ marginLeft: 10, tintColor: "black" }}
				/> */}

        <Text
          style={{
            marginLeft: 15,
            fontSize: 18,
            fontWeight: '700',
            fontFamily: 'Sansation',
            color: textColor,
          }}>
          {name}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default Menus;
