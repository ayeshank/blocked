import {OTP_REQUEST, OTP_FAILURE, OTP_SUCCESS} from '../actions/types';

const initialState = {
  isOTPVerified: false,
};

const otpReducer = (state = initialState, action) => {
  switch (action.type) {
    case OTP_REQUEST:
      return {
        ...state,
        isOTPVerified: false,
      };
    case OTP_SUCCESS:
      return {
        ...state,
        isOTPVerified: true,
      };
    case OTP_FAILURE:
      return {
        ...state,
        isOTPVerified: false,
      };
    default:
      return state;
  }
};

export default otpReducer;
