import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import orderAPI from "@features/order/orderAPI.ts";

export type Order = {
    elements: OrderElement[]
} | {
    id: number;
    createdAt: string;
    updatedAt: string;
    UserId: number;
    Honey: { id: number; type: Honey; remaining: number; [key: string]: any }[];
}

export type OrderElement = {
    honey: Honey,
    quantity: number
}

export type Honey = 'Akác' | 'Gyógy' | 'Hárs' | 'Virág' | 'Repce';

type initialStateType = {
    order: Order | null,
    orders: Order[] | null,
    isLoading: boolean
};

const initialState: initialStateType = {
    order: null,
    orders: null,
    isLoading: false
}

export const orderItems = createAsyncThunk(
    "order/orderItems",
    async (order: Order, thunkAPI) => {
        try {
            return await orderAPI.postOrder(order);
        } catch (error) {
            // @ts-ignore
            const message = error.response.data.error;
            return thunkAPI.rejectWithValue(message);
        }
    });

export const getOrders = createAsyncThunk(
    "order/getOrders",
    async (arg, thunkAPI) => {
        try {
            return await orderAPI.getOrders();
        } catch (error) {
            // @ts-ignore
            const message = error.response.data.error;
            return thunkAPI.rejectWithValue(message);
        }
    }
);

export const orderSlice = createSlice({
    name: 'order',
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder
            .addCase(orderItems.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(orderItems.fulfilled, (state) => {
                state.isLoading = false;
            })
            .addCase(orderItems.rejected, (state) => {
                state.isLoading = false;
            })
            .addCase(getOrders.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getOrders.fulfilled, (state, action) => {
                state.isLoading = false;
                state.orders = action.payload;
            })
            .addCase(getOrders.rejected, (state) => {
                state.isLoading = false;
            })
    }
});

export const selectOrders = (state: { order: initialStateType }) => state.order.orders;

export const {} = orderSlice.actions;
export default orderSlice.reducer;