// deviceReducer.js
const initialState = {
  deviceId: null,
  androidId: null,
  error: null,
};

const deviceReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'FETCH_DEVICE_DATA_SUCCESS':
      return {
        ...state,
        deviceId: action.payload.deviceId,
        androidId: action.payload.androidId,
        error: null,
      };
    case 'FETCH_DEVICE_DATA_FAILURE':
      return {
        ...state,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default deviceReducer;
