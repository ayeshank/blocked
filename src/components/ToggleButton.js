import React from 'react';
import Toggle from 'react-native-toggle-element';

const ToggleButton = () => {
  const [isSwitchOn, setIsSwitchOn] = React.useState(false);

  return (
    <Toggle
      value={isSwitchOn}
      onPress={val => setIsSwitchOn(val)}
      trackBar={{
        activeBackgroundColor: '#3F5CC8',
        inActiveBackgroundColor: 'white',
        width: 50,
        height: 20,
      }}
      trackBarStyle={{
        borderColor: 'white',
      }}
      thumbButton={{
        width: 20,
        height: 20,
        activeBackgroundColor: 'white',
        inActiveBackgroundColor: '#E12160',
      }}
    />
  );
};

export default ToggleButton;
