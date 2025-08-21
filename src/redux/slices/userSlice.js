// src/redux/slices/userSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../axiosInstance";

const initialState = {
  user: null,
  token: null, // store token here
  isAuthenticated: false,
  loading: false,
  error: null,
  operations: {
    profileUpdate: { loading: false, success: false, error: null },
    passwordUpdate: { loading: false, success: false, error: null },
    forgotPassword: {
      loading: false,
      success: false,
      error: null,
      message: null,
    },
    otpVerification: {
      loading: false,
      success: false,
      error: null,
      token: null,
    },
  },
};

// Async Thunks (unchanged)...
export const userRegister = createAsyncThunk(
  "user/register",
  async (userData, { rejectWithValue }) => {
    try {
      const { data } = await axios.post("/api/v1/auth/register", userData);
      return data.user;
    } catch (err) {
      const message =
        err.response?.data?.message || err.message || "Registration failed";
      return rejectWithValue(message);
    }
  }
);

export const login = createAsyncThunk(
  "user/login",
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const { data } = await axios.post("/api/v1/auth/login", {
        email,
        password,
      });

      if (!data.token) {
        return rejectWithValue("No token returned from server");
      }

      // Save token and user in localStorage for persistence
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));

      // Return user and token to be stored in Redux
      return { user: data.user, token: data.token };
    } catch (err) {
      const message =
        err.response?.data?.message || err.message || "Login failed";
      return rejectWithValue(message);
    }
  }
);

export const reloadUser = createAsyncThunk(
  "user/reload",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axios.get("/api/v1/auth/profile");
      return data.user;
    } catch (err) {
      const message =
        err.response?.data?.message || err.message || "Profile reload failed";
      return rejectWithValue(message);
    }
  }
);

export const logout = createAsyncThunk(
  "user/logout",
  async (_, { rejectWithValue }) => {
    try {
      await axios.post("/api/v1/auth/logout");
      return true;
    } catch (err) {
      const message =
        err.response?.data?.message || err.message || "Logout failed";
      return rejectWithValue(message);
    }
  }
);

export const updateProfile = createAsyncThunk(
  "user/updateProfile",
  async (userData, { rejectWithValue }) => {
    try {
      const { data } = await axios.put("/api/v1/auth/profile/update", userData);
      return data.success;
    } catch (err) {
      const message =
        err.response?.data?.message || err.message || "Profile update failed";
      return rejectWithValue(message);
    }
  }
);

export const updatePassword = createAsyncThunk(
  "user/updatePassword",
  async (passwords, { rejectWithValue }) => {
    try {
      const { data } = await axios.put(
        "/api/v1/auth/profile/password/update",
        passwords
      );
      return data.success;
    } catch (err) {
      const message =
        err.response?.data?.message || err.message || "Password update failed";
      return rejectWithValue(message);
    }
  }
);

export const forgotPassword = createAsyncThunk(
  "user/forgotPassword",
  async ({ email }, { rejectWithValue }) => {
    try {
      const { data } = await axios.post("/api/v1/auth/password/forgot", {
        email,
      });
      return data.message;
    } catch (err) {
      const message =
        err.response?.data?.message || err.message || "Forgot password failed";
      return rejectWithValue(message);
    }
  }
);

export const verifyOtp = createAsyncThunk(
  "user/verifyOtp",
  async ({ email, otp }, { rejectWithValue }) => {
    try {
      const { data } = await axios.post("/api/v1/auth/verify/otp", {
        email,
        otp,
      });
      return data;
    } catch (err) {
      const message =
        err.response?.data?.message || err.message || "OTP verification failed";
      return rejectWithValue(message);
    }
  }
);

export const resetPassword = createAsyncThunk(
  "user/resetPassword",
  async ({ passwords }, { rejectWithValue }) => {
    try {
      const { data } = await axios.put(
        "/api/v1/auth/password/reset", // <-- Added quotes
        passwords
      );
      return data.success;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    clearErrors(state) {
      state.error = null;
      Object.values(state.operations).forEach((op) => {
        op.error = null;
      });
    },
    resetOperation(state, action) {
      const opName = action.payload;
      if (!state.operations[opName]) return;
      state.operations[opName] = {
        loading: false,
        success: false,
        error: null,
      };
      if (opName === "forgotPassword")
        state.operations.forgotPassword.message = null;
      if (opName === "otpVerification")
        state.operations.otpVerification.token = null;
    },
    resetProfileUpdate(state) {
      state.operations.profileUpdate = {
        loading: false,
        success: false,
        error: null,
      };
    },
    resetPasswordUpdate(state) {
      state.operations.passwordUpdate = {
        loading: false,
        success: false,
        error: null,
      };
    },
  },
  extraReducers: (builder) => {
    builder
      // login cases
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.user = payload.user; // save user object
        state.token = payload.token; // save token
        state.isAuthenticated = true;
      })
      .addCase(login.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload;
        state.user = null;
        state.token = null;
        state.isAuthenticated = false;
      })
      // Reload
      .addCase(reloadUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(reloadUser.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.user = payload;
        state.isAuthenticated = true;
      })
      .addCase(reloadUser.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload;
        state.isAuthenticated = false;
      })

      // Logout
      .addCase(logout.fulfilled, () => initialState)
      .addCase(logout.rejected, (state, { payload }) => {
        state.error = payload;
      })

      // Update Profile
      .addCase(updateProfile.pending, (state) => {
        state.operations.profileUpdate.loading = true;
        state.operations.profileUpdate.error = null;
      })
      .addCase(updateProfile.fulfilled, (state, { payload }) => {
        state.operations.profileUpdate.loading = false;
        state.operations.profileUpdate.success = payload;
      })
      .addCase(updateProfile.rejected, (state, { payload }) => {
        state.operations.profileUpdate.loading = false;
        state.operations.profileUpdate.error = payload;
      })

      // Update Password
      .addCase(updatePassword.pending, (state) => {
        state.operations.passwordUpdate.loading = true;
        state.operations.passwordUpdate.error = null;
      })
      .addCase(updatePassword.fulfilled, (state, { payload }) => {
        state.operations.passwordUpdate.loading = false;
        state.operations.passwordUpdate.success = payload;
      })
      .addCase(updatePassword.rejected, (state, { payload }) => {
        state.operations.passwordUpdate.loading = false;
        state.operations.passwordUpdate.error = payload;
      })

      // Forgot Password
      .addCase(forgotPassword.pending, (state) => {
        state.operations.forgotPassword.loading = true;
        state.operations.forgotPassword.error = null;
      })
      .addCase(forgotPassword.fulfilled, (state, { payload }) => {
        state.operations.forgotPassword.loading = false;
        state.operations.forgotPassword.success = true;
        state.operations.forgotPassword.message = payload;
      })
      .addCase(forgotPassword.rejected, (state, { payload }) => {
        state.operations.forgotPassword.loading = false;
        state.operations.forgotPassword.error = payload;
      })

      // Verify OTP
      .addCase(verifyOtp.pending, (state) => {
        state.operations.otpVerification.loading = true;
        state.operations.otpVerification.error = null;
      })
      .addCase(verifyOtp.fulfilled, (state, { payload }) => {
        state.operations.otpVerification.loading = false;
        state.operations.otpVerification.success = true;
        state.operations.otpVerification.token = payload.resetPasswordToken;
      })
      .addCase(verifyOtp.rejected, (state, { payload }) => {
        state.operations.otpVerification.loading = false;
        state.operations.otpVerification.error = payload;
      })

      // Reset Password
      .addCase(resetPassword.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(resetPassword.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.operations.passwordUpdate.success = payload;
      })
      .addCase(resetPassword.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload;
      });
  },
});
export const {
  clearErrors,
  resetOperation,
  resetProfileUpdate,
  resetPasswordUpdate,
} = userSlice.actions;

export default userSlice.reducer;
