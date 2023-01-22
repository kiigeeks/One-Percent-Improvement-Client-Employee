import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
    user: null,
    isError: false,
    isLoading: false,
    isSuccess: false,
    isUpdated: false,
    message: ""
}

export const loginUser = createAsyncThunk("user/loginUser", async(user, thunkAPI) => {
    try {
        const response = await axios.post(`${process.env.REACT_APP_BASE_URL}/auth/login`, {
            username: user.username,
            password: user.password
        });
        return response.data.payload;
    } catch (error) {
        if(error.response) {
            const message = error.response.data.message;
            return thunkAPI.rejectWithValue(message);
        }
    }
})

export const getUser = createAsyncThunk("user/getUser", async(_, thunkAPI) => {
    try {
        const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/auth/me`);
        return response.data.payload;
    } catch (error) {
        if(error.response) {
            const message = error.response.data.message;
            return thunkAPI.rejectWithValue(message);
        }
    }
})

export const logoutUser = createAsyncThunk("user/logoutUser", async() => {
    await axios.delete(`${process.env.REACT_APP_BASE_URL}/auth/logout`);
})

export const authSlice = createSlice ({
    name: 'auth',
    initialState,
    reducers: { 
        reset: (state) => initialState,
        notifUpdated: (state) => {
            state.isUpdated = false;
        },
        setNotif: (state) => {
            state.isUpdated = true;
        }
    },
    extraReducers:(builder) => {
        builder.addCase(loginUser.pending, (state) => {
            state.isLoading = true;
        })
        builder.addCase(loginUser.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isSuccess = true;
            state.user = action.payload;
        })
        builder.addCase(loginUser.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.message = action.payload;
        })
        builder.addCase(getUser.pending, (state) => {
            state.isLoading = true;
        })
        builder.addCase(getUser.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isSuccess = true;
            state.user = action.payload;
        })
        builder.addCase(getUser.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.message = action.payload;
        })
    }
})

// export function reset etc as action 
export const { reset, notifUpdated, setNotif } = authSlice.actions
export default authSlice.reducer