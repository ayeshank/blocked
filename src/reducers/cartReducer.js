import {createSlice} from '@reduxjs/toolkit';
import Snackbar from 'react-native-snackbar';

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: [],
  },
  reducers: {
    addToCart(state, action) {
      const newItem = action.payload;
      const existingItem = state.items.find(
        item => item.itemId === newItem.itemId,
      );
      if (!existingItem) {
        state.items.push(newItem);
      } else {
        Snackbar.show({
          backgroundColor: 'red',
          text: 'Item Already Exist In Cart',
          duration: Snackbar.LENGTH_LONG,
        });
      }
    },
    removeFromCart(state, action) {
      const itemId = action.payload;
      state.items = state.items.filter(item => item.itemId !== itemId);
    },
    clearCart(state) {
      if (state.items.length > 0) {
        state.items = [];
        Snackbar.show({
          backgroundColor: 'green',
          text: t('Payment Successful'),
          duration: Snackbar.LENGTH_LONG,
        });
      } else {
        Snackbar.show({
          backgroundColor: 'red',
          text: 'Your Cart is empty',
          duration: Snackbar.LENGTH_LONG,
        });
      }
    },
  },
});

export const {addToCart, removeFromCart, clearCart} = cartSlice.actions;
export default cartSlice.reducer;
