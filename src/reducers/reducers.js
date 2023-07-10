import {combineReducers} from 'redux';
import authReducer from './authReducer';
import languageReducer from './languageReducer';
import deviceReducer from './deviceReducer';
import loginReducer from './loginReducer';
import otpReducer from './otpReducer';
import contactsReducer from './contactsReducer';

const rootReducer = combineReducers({
  auth: authReducer,
  login: loginReducer,
  otp: otpReducer,
  language: languageReducer,
  device: deviceReducer,
  contacts: contactsReducer,
  // Add more reducers here if needed
});

export default rootReducer;
