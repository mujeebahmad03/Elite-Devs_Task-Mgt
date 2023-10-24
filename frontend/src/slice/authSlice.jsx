import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../config/axiosConfig";

// Async thunk for user registration
export const registerUser = createAsyncThunk(
  "auth/register",
  async (userData) => {
    const response = await axiosInstance.post("register/", userData);
    return response.data;
  }
);

// Async thunk for user login
export const loginUser = createAsyncThunk("auth/login", async (userData) => {
  try {
    const response = await axiosInstance.post("login/", userData);
    const { user } = response.data;
    const { token } = response.data.token;

    return { user, token };
  } catch (error) {
    console.error("Login Error:", error);
    throw error; // Rethrow the error for further handling
  }
});

// Define an async thunk for updating user profile
export const updateProfile = createAsyncThunk(
  "auth/updateProfile",
  async ({ token, email, first_name, last_name }, thunkAPI) => {
    try {
      const response = await axiosInstance.put(
        "profile/",
        { email, first_name, last_name },
        {
          headers: {
            Authorization: `Token ${token}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      if (error.response) {
        // Handle server error (e.g., validation errors, 400 Bad Request, 500 Internal Server Error)
        return thunkAPI.rejectWithValue(error.response.data);
      } else {
        // Handle network-related errors (e.g., no internet connection)
        return thunkAPI.rejectWithValue({
          networkError: "Network error occurred",
        });
      }
    }
  }
);
// Define an async thunk for changing the user's password
export const changePassword = createAsyncThunk(
  "auth/changePassword",
  async ({ currentPassword, newPassword, token }, thunkAPI) => {
    try {
      const response = await axiosInstance.post(
        "password/",
        { current_password: currentPassword, new_password: newPassword },
        {
          headers: {
            Authorization: `Token ${token}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      if (error.response) {
        // Handle server error (e.g., validation errors, 400 Bad Request, 500 Internal Server Error)
        return thunkAPI.rejectWithValue(error.response.data);
      } else {
        // Handle network-related errors (e.g., no internet connection)
        return thunkAPI.rejectWithValue({
          networkError: "Network error occurred",
        });
      }
    }
  }
);

// Async thunk for user logout
export const logoutUser = createAsyncThunk(
  "auth/logout",
  async ({ token, id }, thunkAPI) => {
    try {
      const userId = { id: id };
      await axiosInstance.post("logout/", userId, {
        headers: {
          Authorization: `Token ${token}`,
        },
      });
      return null;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    error: null,
    token: null,
    isAuthenticated: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.fulfilled, (state, action) => {
        state.user = action.payload;
        state.error = null;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.user = null;
        state.error = action.error.message;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.error = null;
        state.isAuthenticated = true;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.user = null;
        state.token = null;
        state.error = action.error.message;
        state.isAuthenticated = false;
      })
      .addCase(updateProfile.fulfilled, (state, action) => {
        state.user = action.payload;
      })
      .addCase(updateProfile.rejected, (state, action) => {
        state.error = action.error.message;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.user = null;
        state.token = null;
        state.error = null;
        state.isAuthenticated = false;
      })
      .addCase(changePassword.rejected, (state, action) => {
        state.error = action.error.message;
      });
  },
});

export default authSlice.reducer;
