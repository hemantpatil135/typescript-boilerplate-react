import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import * as userApi from "../apis/userApi";
import { NewUser, User, UserState } from "../models/userModels";

export const fetchUsers = createAsyncThunk("users/fetchAll", userApi.fetchUsers);
export const createUser = createAsyncThunk("users/create", (user: NewUser) => userApi.createUser(user));
export const updateUser = createAsyncThunk("users/update", (user: User) => userApi.updateUser(user));
export const removeUser = createAsyncThunk("users/remove", async (userId: number) => {
  await userApi.deleteUser(userId);
  return userId;
});

export const initialState: UserState = {
  users: [],
  isEdit: false,
  status: "idle",
  error: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setIsEdit: (state, action: PayloadAction<boolean>) => {
      state.isEdit = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.users = action.payload;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message ?? "Could not load users";
      })
      .addCase(createUser.fulfilled, (state, action) => {
        state.users.push(action.payload);
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        const index = state.users.findIndex((u) => u.id === action.payload.id);
        if (index !== -1) state.users[index] = action.payload;
      })
      .addCase(removeUser.fulfilled, (state, action) => {
        state.users = state.users.filter((u) => u.id !== action.payload);
      })
      .addMatcher(
        (action) =>
          [createUser.rejected.type, updateUser.rejected.type, removeUser.rejected.type].includes(
            action.type
          ),
        (state, action: PayloadAction<unknown, string, never, { message?: string }>) => {
          state.error = action.error.message ?? "Request failed";
        }
      );
  },
});

export const { setIsEdit } = userSlice.actions;
export default userSlice.reducer;
