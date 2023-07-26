import {
  WALLET_AUTH_REQ,
  WALLET_AUTH_SUCCESS,
  WALLET_AUTH_FAILURE,
} from '../actions/types';

const initialState = {
  isUserWalletCreated: false,
};

const walletReducer = (state = initialState, action) => {
  switch (action.type) {
    case WALLET_AUTH_REQ:
      return {
        ...state,
        isUserWalletCreated: false,
      };
    case WALLET_AUTH_SUCCESS:
      return {
        ...state,
        isUserWalletCreated: true,
      };
    case WALLET_AUTH_FAILURE:
      return {
        ...state,
        isUserWalletCreated: false,
      };
    default:
      return state;
  }
};

export default walletReducer;
