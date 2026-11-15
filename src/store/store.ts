import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "../reducers/reducers";

// configureStore wires up redux-thunk and the dev-time checks
// (immutability, serializability, Redux DevTools) automatically.
export const store = configureStore({
  reducer: rootReducer,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
