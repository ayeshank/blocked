import DeviceInfo from 'react-native-device-info';

export const fetchDeviceData = () => {
  return async dispatch => {
    try {
      // const deviceId = await DeviceInfo.getDeviceId();
      // const androidId = await DeviceInfo.getAndroidId();
      const deviceId = 'mock-device-id';
      const androidId = 'mock-android-id';

      dispatch({
        type: 'FETCH_DEVICE_DATA_SUCCESS',
        payload: {deviceId, androidId},
      });
    } catch (error) {
      dispatch({
        type: 'FETCH_DEVICE_DATA_FAILURE',
        payload: error.message,
      });
    }
  };
};
