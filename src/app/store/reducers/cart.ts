import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";
import { CartItemsType } from "@/types";

type CartEntity = CartItemsType;

interface CartType {
  cartItems: CartEntity[];
}

const initialState: CartType = {
  cartItems: [],
}

const indexSameProduct = (state: CartType, action: string) => {
  const sameProduct = (product: CartEntity) => product.id === action;
  return state.cartItems.findIndex(sameProduct);
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addProduct: (state, action: PayloadAction<CartEntity>) => {
      const cartItems = state.cartItems;
      const index = indexSameProduct(state, action.payload.id);
      if (index !== -1) {
        cartItems[index].count += action.payload.count;
        return;
      }
      return {
        ...state,
        cartItems: [...state.cartItems, action.payload],
      };
    },
    removeProduct(state, action: PayloadAction<string>) {
      state.cartItems.splice(indexSameProduct(state, action.payload), 1);
    },
    setCount(state, action: PayloadAction<CartEntity>) {
      const indexItem = indexSameProduct(state, action.payload.id);
      return {
        ...state,
        cartItems: state.cartItems.map((item, index) =>
          index === indexItem ? { ...item, count: action.payload.count } : item
        ),
      }
      // state.cartItems[indexItem].count = action.payload.count;
    },
    clearCart(state) {
      state.cartItems = [];
    },
  },
});

export const { addProduct, removeProduct, setCount, clearCart } = cartSlice.actions;
export default cartSlice.reducer;