import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type { PayloadAction } from '@reduxjs/toolkit';
import { loginAPI } from "./authApi";
import type { AuthState } from "./types";

const initialState: AuthState = {
    token: localStorage.getItem("token") || "",
    user: null,
    status: "idle",
    error: null,
};

// Async thunk for login
export const loginUser = createAsyncThunk(
    "auth/login",
    async (data: { username: string; password: string }, { rejectWithValue }) => {
        try {
            const response = await loginAPI(data);
            return response; // { token }
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (err: any) {
            return rejectWithValue(err.response?.data?.message || "Login failed");
        }
    }
);

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setCredentials: (
            state,
            action: PayloadAction<{ token: string; user: string }>
        ) => {
            state.token = action.payload.token;
            state.user = action.payload.user;
            localStorage.setItem("token", action.payload.token);
        },
        logout: (state) => {
            state.token = "";
            state.user = null;
            localStorage.removeItem("token");
        },
    },
    extraReducers: (builder) => {
        // Login
        builder.addCase(loginUser.pending, (state) => {
            state.status = "loading";
            state.error = null;
        });
        builder.addCase(loginUser.fulfilled, (state, action: PayloadAction<{ token: string }>) => {
            state.status = "idle";
            state.token = action.payload.token;
            state.user = "User"; // you can decode JWT to get username
            localStorage.setItem("token", action.payload.token);
        });
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        builder.addCase(loginUser.rejected, (state, action: PayloadAction<any>) => {
            state.status = "failed";
            state.error = action.payload;
        });
    },
});

export const { setCredentials, logout } = authSlice.actions;
export default authSlice.reducer;