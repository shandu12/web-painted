import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";
import type { UserType } from "@/types";

const initialState = {
  name: '',
  favouriteProducts: [],
} as UserType;

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUserLogged(state, action: PayloadAction<UserType>) {
      state.name = action.payload.name;
    },
    logoutUser(state) {
      state.name = '';
      state.favouriteProducts = [];
    },
    toggleFavProduct(state, action: PayloadAction<{ id: string }>) {
      if (state) {
        if (!state.favouriteProducts) {
          state.favouriteProducts = [];
        }
        const index = state.favouriteProducts.findIndex(
          (productId) => productId === action.payload.id,
        );
        if (index === -1) {
          state.favouriteProducts.push(action.payload.id);
        } else {
          state.favouriteProducts.splice(index, 1);
        }
      }
    },
  },
});

export const { setUserLogged, logoutUser, toggleFavProduct } = userSlice.actions;
export default userSlice.reducer;


