import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import authService from './authService.js'

const initialState = {
    user: localStorage.getItem('user') 
    ? JSON.parse(localStorage.getItem('user')) 
    : null,
    isLoading: false,
    isSuccess: false,
    isError: false,
    message: ''
}

//Register user
export const userRegister = createAsyncThunk('auth/register',
    async (user, thunkAPI) => {
        try {
            return await authService.userRegister(user)
        } catch(error) {
            const message = (error.response && error.response.data && error.response.data.message) || 
                error.message || error.toString()
            
            return thunkAPI.rejectWithValue(message)
        }
    }
)

//Login user
export const userLogin = createAsyncThunk('auth/login', 
    async (user, thunkAPI) => {
        try {
            return await authService.userLogin(user)
        } catch(error) {
            const message = (error.response && error.response.data && error.response.data.message) || 
                error.message || error.toString()
            
            return thunkAPI.rejectWithValue(message)
        }
    }
)

//Update user
export const userUpdate = createAsyncThunk('auth/update', 
    async (user, thunkAPI) => {
        try {
            return await authService.userLogin(user)
        } catch(error) {
            const message = (error.response && error.response.data && error.response.data.message) || 
                error.message || error.toString()
            
            return thunkAPI.rejectWithValue(message)
        }
    }
)

//Logout user
export const userLogout = createAsyncThunk("auth/logout", async () => {
    try {
      await authService.userLogout();
    } catch (err) {
      console.log(err);
    }
  })

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        reset: (state) => initialState
    },
    extraReducers: (builder) => {
        builder
            .addCase(userRegister.pending, (state) => {
                state.isLoading = true
                state.isSuccess = false
                state.isError = false
                state.user = null
                state.message = ''
            })
            .addCase(userRegister.fulfilled, (state, action) => {
                state.isLoading = false
                state.isError = false
                state.isSuccess = true
                state.user = action.payload
                state.message = ''
            })
            .addCase(userRegister.rejected, (state, action) => {
                state.isLoading = false
                state.isSuccess = false
                state.isError = true
                state.user = null
                state.message = action.payload
            })
            .addCase(userLogin.pending, (state) => {
                state.isLoading = true
                state.isError = false
                state.isSuccess = false
                state.user = null
                state.message = ''
              })
              .addCase(userLogin.fulfilled, (state, action) => {
                state.isLoading = false
                state.isError = false
                state.isSuccess = true
                state.user = action.payload
                state.message = ''
              })
              .addCase(userLogin.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.isSuccess = false
                state.user = null
                state.message = action.payload
              })
              .addCase(userLogout.pending, (state) => {
                state.isLoading = true
                state.isError = false
                state.isSuccess = false
                state.user = null
                state.message = ""
              })
              .addCase(userLogout.fulfilled, (state) => {
                state.isLoading = false
                state.isError = false
                state.isSuccess = true
                state.user = null
                state.message = ""
              })
              .addCase(userLogout.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.user = null;
                state.message = action.payload;
              })
              .addCase(userUpdate.pending, (state) => {
                state.isLoading = true;
                state.isError = false;
                state.isSuccess = false;
                state.user = null;
                state.message = "";
              })
              .addCase(userUpdate.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.isSuccess = true;
                state.user = action.payload;
                state.message = "";
              })
              .addCase(userUpdate.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.user = null;
                state.message = action.payload;
              })
    }
})

export const  {reset} = authSlice.actions
export default authSlice.reducer