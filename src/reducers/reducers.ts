import { combineReducers } from "@reduxjs/toolkit";
import userAuthReducer from "../slices/authSlice";
import userReducer from "../slices/userSlice";

const rootReducer = combineReducers({
  userDetails: userReducer,
  authUser: userAuthReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
