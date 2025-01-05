export type CartItem = {
  id: string;
  title: string;
  price: number;
  imageUrl: string;
  type: string;
  size: number;
  count: number;
  uniqueKey?: string;
};

export interface CartSliceState {
  totalPrice: number;
  items: CartItem[];
}
