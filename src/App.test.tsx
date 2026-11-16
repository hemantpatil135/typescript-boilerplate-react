import React from "react";
import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import App from "./App";
import rootReducer from "./reducers/reducers";

const renderAt = (path: string) => {
  window.history.pushState({}, "", path);
  const store = configureStore({ reducer: rootReducer });
  return render(
    <Provider store={store}>
      <App />
    </Provider>
  );
};

test("shows the login form at /", () => {
  renderAt("/");
  expect(screen.getByRole("heading", { name: /login/i })).toBeInTheDocument();
  expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
});

test("redirects unauthenticated visitors from /users to the login form", () => {
  renderAt("/users");
  expect(screen.getByRole("heading", { name: /login/i })).toBeInTheDocument();
  expect(window.location.pathname).toBe("/");
});
