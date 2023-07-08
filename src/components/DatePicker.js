import React, {useState, useEffect} from 'react';
import {View, Animated} from 'react-native';
import DatePicker from 'react-native-datepicker';
import styles from '../theme/theme';

const DateSelect = () => {
  const [date, setDate] = useState();
  const animatedValue = new Animated.Value(0);
  const today = new Date();

  useEffect(() => {
    Animated.timing(animatedValue, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.date}>
        <DatePicker
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            width: '100%',
          }}
          date={date}
          mode="date"
          placeholder="Select Date"
          format="DD/MM/YYYY"
          minDate="01-01-1980"
          maxDate={today}
          confirmBtnText="Confirm"
          cancelBtnText="Cancel"
          androidMode="calendar"
          customStyles={{
            dateText: {
              color: 'black',
              fontFamily: 'Sansation_Regular',
              fontSize: 15,
              flex: 1,
            },
            placeholderText: {
              color: 'black',
            },
            dateInput: {
              borderColor: 'white',
              flex: 1,
              flexDirection: 'row',
              justifyContent: 'space-between',
              padding: 10,
            },
          }}
          onDateChange={date => {
            setDate(date);
          }}
        />
      </View>
    </View>
  );
};

export default DateSelect;
