import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import authAPI from "./authAPI.js";
import {RootState} from "@context/store.ts";
import {API_CONFIG} from "@context/api.ts";

const token = localStorage.getItem("token");

export type LoginRequest = {
    username: string,
    password: string
}

type initialStateType = {
    token: string | null,
    isLoading: boolean
}

const initialState: initialStateType = {
    token: token ?? null,
    isLoading: false
};

export const login = createAsyncThunk(
    "auth/login",
    async (user: LoginRequest, thunkAPI) => {
        try {
            return await authAPI.login(user);
        } catch (error: unknown) {
            // @ts-ignore
            const message = error.response.data.error || error.response.data.message || error.message || "";
            return thunkAPI.rejectWithValue(message);
        }
    });

export const register = createAsyncThunk(
    "auth/register",
    async (user: LoginRequest, thunkAPI) => {
        try {
            return await authAPI.register(user);
        } catch (error: unknown) {
            // @ts-ignore
            const message = error.response.data.error || error.response.data.message || error.message || "";
            return thunkAPI.rejectWithValue(message);
        }
    }
);

export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        logout: (state) => {
            state.token = null;
            localStorage.removeItem("token");
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(login.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(login.fulfilled, (state, action) => {
                // @ts-ignore
                state.token = action.payload.token;
                API_CONFIG.headers!.Authorization = `Bearer ${action.payload.token}`;
                state.isLoading = false;
            })
            .addCase(login.rejected, (state) => {
                state.isLoading = false;
            })
            .addCase(register.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(register.fulfilled, (state, action) => {
                // @ts-ignore
                state.token = action.payload.token;
                API_CONFIG.headers!.Authorization = `Bearer ${action.payload.token}`;
                state.isLoading = false;
            })
            .addCase(register.rejected, (state) => {
                state.isLoading = false;
            })
    }
});

export const selectToken = (state: RootState): string | null => state.auth.token;

export const selectIsAuthenticated = (state: RootState): boolean => {
    const token = selectToken(state);
    return token !== null && token.trim() !== '';
};

export const {logout} = authSlice.actions;
export default authSlice.reducer;