import {CHANGE_LANGUAGE} from '../actions/types';

const initialState = {
  selectedLanguage: 'en', // Default language
};

const languageReducer = (state = initialState, action) => {
  switch (action.type) {
    case CHANGE_LANGUAGE:
      return {
        ...state,
        selectedLanguage: action.payload,
      };
    default:
      return state;
  }
};

export default languageReducer;
