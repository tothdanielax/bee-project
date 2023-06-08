import {configureStore} from "@reduxjs/toolkit";
import authReducer from "@features/auth/authSlice.js";
import orderReducer from "@features/order/orderSlice.js";
import cartReducer from "@features/cart/cartSlice.js";
import {TypedUseSelectorHook, useDispatch, useSelector} from "react-redux";

const store = configureStore({
    reducer: {
        auth: authReducer,
        order: orderReducer,
        cart: cartReducer
    }
});

// types
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

// typed hooks
export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export default store;