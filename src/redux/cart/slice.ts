import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { calcTotalPrice } from "../../utils/calcTotalPrice";
import { getCartFromLS } from "../../utils/getCartFromLS";
import { CartItem, CartSliceState } from "./types";

const initialState: CartSliceState = getCartFromLS();

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItem(state, action: PayloadAction<CartItem>) {
      const uniqueKey = `${action.payload.id}_${action.payload.size}_${action.payload.type}`;

      const findItem = state.items.find((obj) => obj.uniqueKey === uniqueKey);

      if (findItem) {
        findItem.count++;
      } else {
        state.items.push({
          ...action.payload,
          count: 1,
          uniqueKey: uniqueKey,
        });
      }

      state.totalPrice = calcTotalPrice(state.items);
    },
    minusItem(
      state,
      action: PayloadAction<{ id: string; size: number; type: string }>
    ) {
      const findItem = state.items.find(
        (obj) =>
          obj.id === action.payload.id &&
          obj.size === action.payload.size &&
          obj.type === action.payload.type
      );

      if (findItem) {
        findItem.count--;
      }

      state.totalPrice = calcTotalPrice(state.items);
    },
    removeItem(
      state,
      action: PayloadAction<{ id: string; size: number; type: string }>
    ) {
      state.items = state.items.filter(
        (obj) =>
          !(
            obj.id === action.payload.id &&
            obj.size === action.payload.size &&
            obj.type === action.payload.type
          )
      );
      state.totalPrice = calcTotalPrice(state.items);
    },
    clearItems(state) {
      state.items = [];
      state.totalPrice = 0;
    },
  },
});

export const { addItem, removeItem, minusItem, clearItems } = cartSlice.actions;

export default cartSlice.reducer;
