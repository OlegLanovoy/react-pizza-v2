import { RootState } from "../store";

export const selectCart = (state: RootState) => state.cart;

export const selectCartItemById = (id: string) => (state: RootState) => {
  return state.cart.items.find((obj) => obj.id === id);
};

export const selectCartTotalCountById = (id: string) => (state: RootState) => {
  return state.cart.items
    .filter((item) => item.id === id)
    .reduce((total, item) => total + item.count, 0);
};
