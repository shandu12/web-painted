import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./reducers/cart";
import userReducer from "./reducers/user";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { combineReducers } from "@reduxjs/toolkit";
import { UserType } from "@/types";

const CartPersistConfig = {
  key: 'cart',
  storage: storage,
  whitelist: ['cartItems'],
};

const UserPersistConfig = {
  key: 'user',
  storage: storage,
  whitelist: ['name','favouriteProducts'],
};


const rootReducer = combineReducers({
  cart: persistReducer(CartPersistConfig, cartReducer),
  user: persistReducer(UserPersistConfig, userReducer),
});

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
});

export default store;

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
// Infer the type of makeStore
export type AppStore = ReturnType<typeof configureStore>
// Infer the `RootState` and `AppDispatch` types from the store itself

// we define some utilities here to make state checking a bit more modular 
export function checkIsLogged(user: UserType): boolean {
  return user.name !== '';
}
