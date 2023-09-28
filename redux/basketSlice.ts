import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Type for our state
export interface BasketState {
  basket: any[];
}

// Initial state
const initialState: BasketState = {
  basket: [],
};

export const basketSlice = createSlice({
  name: "basket",
  initialState,
  reducers: {
    // Action to set the authentication status
    setBasketState(state, action) {
      state.basket = action.payload;
    },
  },
});

export const {
  setBasketState
} = basketSlice.actions;
export default basketSlice.reducer;