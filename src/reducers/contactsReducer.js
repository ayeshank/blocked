import {
  CONTACT_REQUEST,
  CONTACT_FAILURE,
  CONTACT_SUCCESS,
} from '../actions/types';

const initialState = {
  isContactsFetched: false,
};

const contactsReducer = (state = initialState, action) => {
  switch (action.type) {
    case CONTACT_REQUEST:
      return {
        ...state,
        isContactsFetched: false,
      };
    case CONTACT_SUCCESS:
      return {
        ...state,
        isContactsFetched: true,
      };
    case CONTACT_FAILURE:
      return {
        ...state,
        isContactsFetched: false,
      };
    default:
      return state;
  }
};

export default contactsReducer;
