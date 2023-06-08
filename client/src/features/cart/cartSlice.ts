import {createSlice} from "@reduxjs/toolkit";
import {OrderElement} from "@features/order/orderSlice.ts";


type initialStateType = {
    items: OrderElement[]
};

const initialState: initialStateType = {
    items: []
}

export const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addElement: (state, action) => {
            if (state.items?.find((item) => item.honey === action.payload.honey)) {
                return {
                    items: state.items.map((item) => {
                        if (item.honey === action.payload.honey) {
                            return {
                                ...item,
                                quantity: item.quantity + action.payload.quantity
                            }
                        }
                        return item;
                    })
                }
            } else {
                state.items = [...state.items, action.payload];
            }
        },
        removeElement: (state, action) => {
            state.items = state.items.filter((item) => item.honey !== action.payload.honey);
        },
        clearCart: (state) => {
            state.items = [];
        },
        updateElement: (state, action) => {
            return {
                items: state.items.map((item) => {
                    if (item.honey === action.payload.honey) {
                        return {
                            ...item,
                            quantity: action.payload.quantity
                        }
                    }
                    return item;
                })
            }
        }
    }
});

export const selectItems = (state: { cart: { items: OrderElement[] | null; }; }) => state.cart.items;


export const {addElement, removeElement, clearCart, updateElement} = cartSlice.actions;
export default cartSlice.reducer;