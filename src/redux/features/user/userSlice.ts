import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type { PayloadAction } from '@reduxjs/toolkit';
import type { UserState } from "./types";
import { getUserAccountDetails } from "../../../api/userApi";

const initialState: UserState = {
    userDetails: null,
    isLoading: true,
    error: null,
};

// Async thunk for login
export const getUserDetails = createAsyncThunk(
    "user/getUserDetails",
    async (_, { rejectWithValue }) => {
        try {
            const response = await getUserAccountDetails();
            return response; // { token }
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (err: any) {
            return rejectWithValue(err.response?.data?.message || "Login failed");
        }
    }
);

const authSlice = createSlice({
    name: "user",
    initialState,
    reducers: {

    },
    extraReducers: (builder) => {
        // Login
        builder.addCase(getUserDetails.pending, (state) => {
            state.isLoading = true;
            state.error = null;
        });
        builder.addCase(getUserDetails.fulfilled, (state, action: PayloadAction<{ token: string }>) => {
            state.userDetails = action.payload.token;
            state.isLoading = false;
        });
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        builder.addCase(getUserDetails.rejected, (state, action: PayloadAction<any>) => {
            state.isLoading = false;
            state.error = action.payload;
        });
    },
});

// eslint-disable-next-line no-empty-pattern
export const { } = authSlice.actions;
export default authSlice.reducer;