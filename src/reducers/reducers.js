import {combineReducers} from 'redux';
import authReducer from './authReducer';
import languageReducer from './languageReducer';
import deviceReducer from './deviceReducer';
import loginReducer from './loginReducer';
import otpReducer from './otpReducer';

const rootReducer = combineReducers({
  auth: authReducer,
  login: loginReducer,
  otp: otpReducer,
  language: languageReducer,
  device: deviceReducer,
  // Add more reducers here if needed
});

export default rootReducer;
