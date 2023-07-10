import React from 'react';
import Toggle from 'react-native-toggle-element';

const ToggleButton = () => {
  const [isSwitchOn, setIsSwitchOn] = React.useState(false);

  return (
    <Toggle
      value={isSwitchOn}
      onPress={val => setIsSwitchOn(val)}
      trackBar={{
        activeBackgroundColor: '#3FB65F',
        inActiveBackgroundColor: '#E0E0E0',
        width: 50,
        height: 20,
      }}
      trackBarStyle={{
        borderColor: 'white',
      }}
      thumbButton={{
        width: 14,
        height: 14,
        activeBackgroundColor: 'white',
        inActiveBackgroundColor: '#3FB65F',
      }}
    />
  );
};

export default ToggleButton;
