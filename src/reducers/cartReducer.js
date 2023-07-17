import {createSlice} from '@reduxjs/toolkit';

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
      }
    },
    removeFromCart(state, action) {
      const itemId = action.payload;
      state.items = state.items.filter(item => item.itemId !== itemId);
    },
    clearCart(state) {
      console.log('clear: ');
      state.items = [];
    },
  },
});

export const {addToCart, removeFromCart, clearCart} = cartSlice.actions;
export default cartSlice.reducer;
